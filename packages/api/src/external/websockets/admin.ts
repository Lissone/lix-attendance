/* eslint-disable camelcase */
import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionsService } from '../useCases/ConnectionsService'
import { MessagesService } from '../useCases/MessagesService'

io.on('connect', async (socket: Socket) => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()

  const allConnectionsWithoutAdmin = await connectionsService.getAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin) // para todos os sockets

  socket.on('admin_list_messages_by_user', async ({ user_id }, callback) => { // recebe parâmetros e função callback para devolver resposta
    const allMessages = await messagesService.getAllByUser(user_id)

    callback(allMessages)
  })

  socket.on('admin_send_message', async ({ text, user_id }) => {
    await messagesService.create({
      admin_id: socket.id,
      user_id,
      text
    })

    const { socket_id } = await connectionsService.getOneByUserId(user_id)

    io.to(socket_id).emit('admin_send_to_client', { // emitindo evento para socket específico
      text,
      socket_id: socket.id
    })
  })

  socket.on('admin_user_in_support', async ({ user_id }) => {
    await connectionsService.updateAdminId(user_id, socket.id)

    const allConnectionsWithoutAdmin = await connectionsService.getAllWithoutAdmin()

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin) // para todos os sockets
  })
})
