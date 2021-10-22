import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionRepository } from '@repositories/ConnectionRepository'
import { MessageRepository } from '@repositories/MessageRepository'
import { UserRepository } from '@repositories/UserRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

io.on('connect', (socket: Socket) => {
  const connectionRepository = new ConnectionRepository()
  const messageRepository = new MessageRepository()
  const userRepository = new UserRepository()

  const connectionUseCase = new ConnectionUseCase(connectionRepository)
  const messageUseCase = new MessageUseCase(messageRepository)
  const userUseCase = new UserUseCase(userRepository)

  socket.on('client_send_to_admin', async ({ connectionId, clientId, adminId, text }, callback) => {
    if (!connectionId) {
      const connection = await connectionUseCase.create({ clientId })

      await messageUseCase.create({ connectionId: connection.id, clientId, text })

      const connectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

      io.emit('admin_list_clients_without_admin', connectionsWithoutAdmin) // for all sockets

      callback(connection.id)
    } else {
      const message = await messageUseCase.create({ connectionId, clientId, text })

      const admin = await userUseCase.getOne(adminId)

      io.to(admin.socket).emit('admin_receive_message', {
        clientId,
        message
      })
    }
  })

  socket.on('client_reopen_connection', async (connectionId: string) => {
    const connection = await connectionUseCase.getOne(connectionId)

    const connectionUnclosed = {
      id: connection.id,
      adminId: connection.adminId,
      clientId: connection.clientId,
      createdAt: connection.createdAt,
      updatedAt: connection.updatedAt,
      closedAt: null
    }

    await connectionUseCase.update(connectionUnclosed)

    const newConnection = await connectionUseCase.getOne(connectionId)

    io.to(newConnection.admin.socket).emit('client_reopen_connection_with_admin', { // emitting event for specific socket
      connection: newConnection
    })
  })
})
