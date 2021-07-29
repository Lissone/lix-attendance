import path from 'path'
import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { routes } from './routes'
import './database'

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
})

app.use(routes)

const http = createServer(app)
const io = new Server(http)

io.on('connection', (socket: Socket) => {
  console.log('Socket id:', socket.id)
})

export { http, io }
