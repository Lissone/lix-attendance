import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionRepository } from '@repositories/connectionRepository'
import { MessageRepository } from '@repositories/messageRepository'
import { UserRepository } from '@repositories/userRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

interface IParams {
  text: string
  email: string
}

// io.on('connect', (socket: Socket) => {
//   const connectionRepository = new ConnectionRepository()
//   const messageRepository = new MessageRepository()
//   const userRepository = new UserRepository()

//   const connectionUseCase = new ConnectionUseCase(connectionRepository)
//   const messageUseCase = new MessageUseCase(messageRepository)
//   const userUseCase = new UserUseCase(userRepository)

//   const userSocket = socket.id

//   socket.on('client_first_access', async ({ text, email }: IParams) => {
//     console.log('chegou')
//     let userId = null

//     const userAlreadyExists = await userUseCase.getOneByEmail(email)

//     if (!userAlreadyExists) {
//       const user = await userUseCase.create(email)

//       await connectionUseCase.create({
//         userSocket,
//         userId: user.id
//       })

//       userId = user.id
//     } else {
//       userId = userAlreadyExists.id

//       const connection = await connectionUseCase.getOneByUserId(userAlreadyExists.id)

//       if (!connection) {
//         await connectionUseCase.create({
//           userSocket,
//           userId: userAlreadyExists.id
//         })
//       } else {
//         connection.userSocket = userSocket

//         await connectionUseCase.create(connection)
//       }
//     }

//     await messageUseCase.create({ userId, text })

//     const allMessages = await messageUseCase.getAllByUser(userId)

//     socket.emit('client_list_all_messages', allMessages)

//     const allUsers = await connectionUseCase.getAllWithoutAdmin()

//     io.emit('admin_list_all_users', allUsers)
//   })

//   // eslint-disable-next-line camelcase
//   socket.on('client_send_to_admin', async ({ text, socket_admin_id }) => {
//     const { userId } = await connectionUseCase.getOneByUserSocket(socket.id)

//     const message = await messageUseCase.create({ userId, text })

//     io.to(socket_admin_id).emit('admin_receive_message', {
//       message,
//       socket_id: socket.id
//     })
//   })
// })
