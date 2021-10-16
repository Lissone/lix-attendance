import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionRepository } from '@repositories/ConnectionRepository'
// import { MessageRepository } from '@repositories/messageRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
// import { MessageUseCase } from '@useCases/message/messageUseCase'

io.on('connect', async (socket: Socket) => {
  const connectionRepository = new ConnectionRepository()
  // // const messageRepository = new MessageRepository()

  const connectionUseCase = new ConnectionUseCase(connectionRepository)
  // // const messageUseCase = new MessageUseCase(messageRepository)

  socket.on('admin_list_all_clients', async ({ adminId }, callback) => {
    const connectionsUnclosed = await connectionUseCase.getAllUnclosedByAdminId(adminId)

    const connectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

    const allConnections = [
      ...connectionsWithoutAdmin,
      ...connectionsUnclosed
    ]

    callback(allConnections)
  })

  // socket.on('admin_list_messages_by_user', async ({ userId }, callback) => { // recebe parâmetros e função callback para devolver resposta
  //   const allMessages = await messageUseCase.getAllByUser(userId)

  //   callback(allMessages)
  // })

  // socket.on('admin_send_message', async ({ text, userId }) => {
  //   await messageUseCase.create({
  //     adminSocket: socket.id,
  //     userId,
  //     text
  //   })

  //   const { userSocket } = await connectionUseCase.getOneByUserId(userId)

  //   io.to(userSocket).emit('admin_send_to_client', { // emitindo evento para socket específico
  //     text,
  //     socket_id: socket.id
  //   })
  // })

  socket.on('admin_in_support', async ({ clientId, adminId }) => {
    console.log(clientId, adminId)

    await connectionUseCase.updateWithAdmin(clientId, adminId)

    const allConnectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

    console.log(allConnectionsWithoutAdmin)

    io.emit('admin_list_clients_without_admin', allConnectionsWithoutAdmin) // for all sockets
  })
})
