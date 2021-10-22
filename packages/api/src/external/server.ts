import 'reflect-metadata'
import { Socket } from 'socket.io'

import './envConfig'
import './websockets/client'
import './websockets/admin'

import { http, io } from './app'
import { connection } from './database/dbConfig'

const port = process.env.PORT || 5000

connection
  .then(() => {
    console.log('Database connected')
  })
  .catch(ret => console.log(ret))

io.on('connection', (socket: Socket) => {
  console.log('Socket id:', socket.id)
})

http.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
