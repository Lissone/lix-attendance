/* eslint-disable camelcase */
import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'
import { UserService } from '../services/UserService'

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket: Socket) => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()
  const usersService = new UserService()

  const socket_id = socket.id

  socket.on('client_first_access', async ({ text, email }: IParams) => {
    let user_id = null

    const userAlreadyExists = await usersService.findByEmail(email)

    if (!userAlreadyExists) {
      const user = await usersService.create(email)

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id
    } else {
      user_id = userAlreadyExists.id

      const connection = await connectionsService.getOneByUserId(userAlreadyExists.id)

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userAlreadyExists.id
        })
      } else {
        connection.socket_id = socket_id

        await connectionsService.create(connection)
      }
    }

    await messagesService.create({ user_id, text })

    const allMessages = await messagesService.getAllByUser(user_id)

    socket.emit('client_list_all_messages', allMessages)
  })

  socket.on('client_send_to_admin', async ({ text, socket_admin_id }) => {
    const { user_id } = await connectionsService.getOneBySocketId(socket.id)

    const message = await messagesService.create({ user_id, text })

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id: socket.id
    })
  })
})
