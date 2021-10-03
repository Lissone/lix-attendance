import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionRepository } from '@repositories/connectionRepository'
import { MessageRepository } from '@repositories/messageRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'

io.on('connect', async (socket: Socket) => {
  const connectionRepository = new ConnectionRepository()
  const messageRepository = new MessageRepository()

  const connectionUseCase = new ConnectionUseCase(connectionRepository)
  const messageUseCase = new MessageUseCase(messageRepository)

  const allConnectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin) // para todos os sockets

  socket.on('admin_list_messages_by_user', async ({ userId }, callback) => { // recebe parâmetros e função callback para devolver resposta
    const allMessages = await messageUseCase.getAllByUser(userId)

    callback(allMessages)
  })

  socket.on('admin_send_message', async ({ text, userId }) => {
    await messageUseCase.create({
      adminSocket: socket.id,
      userId,
      text
    })

    const { userSocket } = await connectionUseCase.getOneByUserId(userId)

    io.to(userSocket).emit('admin_send_to_client', { // emitindo evento para socket específico
      text,
      socket_id: socket.id
    })
  })

  socket.on('admin_user_in_support', async ({ userId }) => {
    await connectionUseCase.updateAdminSocket(userId, socket.id)

    const allConnectionsWithoutAdmin = await connectionUseCase.getAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin) // para todos os sockets
  })
})
