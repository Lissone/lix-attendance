import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket: Socket) => {
  const connectionUseCase = new ConnectionUseCase()
  const messageUseCase = new MessageUseCase()
  const userUseCase = new UserUseCase()

  const userSocket = socket.id

  socket.on('client_first_access', async ({ text, email }: IParams) => {
    let userId = null

    const userAlreadyExists = await userUseCase.findByEmail(email)

    if (!userAlreadyExists) {
      const user = await userUseCase.create(email)

      await connectionUseCase.create({
        userSocket,
        userId: user.id
      })

      userId = user.id
    } else {
      userId = userAlreadyExists.id

      const connection = await connectionUseCase.getOneByUserId(userAlreadyExists.id)

      if (!connection) {
        await connectionUseCase.create({
          userSocket,
          userId: userAlreadyExists.id
        })
      } else {
        connection.userSocket = userSocket

        await connectionUseCase.create(connection)
      }
    }

    await messageUseCase.create({ userId, text })

    const allMessages = await messageUseCase.getAllByUser(userId)

    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionUseCase.getAllWithoutAdmin()

    io.emit('admin_list_all_users', allUsers)
  })

  // eslint-disable-next-line camelcase
  socket.on('client_send_to_admin', async ({ text, socket_admin_id }) => {
    const { userId } = await connectionUseCase.getOneBySocketId(socket.id)

    const message = await messageUseCase.create({ userId, text })

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id: socket.id
    })
  })
})
