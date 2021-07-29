import { Socket } from 'socket.io'

import { io } from '../app'

io.on('connect', (socket: Socket) => {
  socket.on('client_first_access', params => {
    console.log(params)
  })
})
