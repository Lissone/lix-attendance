/* eslint-disable camelcase */
import { Socket } from 'socket.io'

import { io } from '../app'

import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'

io.on('connect', async (socket: Socket) => {
  const connectionsService = new ConnectionsService()
  const messagesService = new MessagesService()

  const allConnectionsWithoutAdmin = await connectionsService.getAllWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin) // para todos os sockets

  socket.on('admin_list_messages_by_user', async (params, callback) => { // recebe parâmetros e função callback
    const { user_id } = params

    const allMessages = await messagesService.getAllByUser(user_id) // para socket específico

    callback(allMessages)
  })
})
