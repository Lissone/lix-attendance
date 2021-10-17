/* eslint-disable node/no-callback-literal */
import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionRepository } from '@repositories/ConnectionRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { UserRepository } from '@repositories/UserRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

io.on('connect', async (socket: Socket) => {
  const connectionRepository = new ConnectionRepository()
  const messageRepository = new MessageRepository()
  const userRepository = new UserRepository()

  const connectionUseCase = new ConnectionUseCase(connectionRepository)
  const messageUseCase = new MessageUseCase(messageRepository)
  const userUseCase = new UserUseCase(userRepository)

  socket.on('admin_list_all_clients', async ({ adminId }, callback) => {
    const connectionsUnclosed = await connectionUseCase.getAllUnclosedByAdminId(adminId)

    const connectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

    callback({ connectionsUnclosed, connectionsWithoutAdmin })
  })

  // socket.on('admin_list_messages_by_user', async ({ userId }, callback) => { // recebe parâmetros e função callback para devolver resposta
  //   const allMessages = await messageUseCase.getAllByUser(userId)

  //   callback(allMessages)
  // })

  socket.on('admin_send_message', async ({ connectionId, clientId, adminId, text }) => {
    const message = await messageUseCase.create({ connectionId, adminId, clientId, text })

    const client = await userUseCase.getOne(clientId)

    io.to(client.socket).emit('admin_send_to_client', { // emitting event for specific socket
      message
    })
  })

  socket.on('admin_in_support', async ({ clientId, adminId }, callback) => {
    await connectionUseCase.updateWithAdmin(clientId, adminId)

    const connectionsUnclosed = await connectionUseCase.getAllUnclosedByAdminId(adminId)

    callback(connectionsUnclosed)

    const connectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

    io.emit('admin_list_clients_without_admin', connectionsWithoutAdmin) // for all sockets

    const user = await userUseCase.getOne(clientId)

    const admin = await userUseCase.getOne(adminId)

    io.to(user.socket).emit('admin_connect_with_client', { // emitting event for specific socket
      admin
    })
  })
})
