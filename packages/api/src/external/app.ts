import path from 'path'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { apiRoutes } from './routes'

const app = express()

app.use(express.json())
app.disable('x-powered-by')

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true
}

app.use(cors(options))

app.use(apiRoutes)

const http = createServer(app)
const io = new Server(http)

// to create a route for front html
app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
})

app.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html')
})

export { http, io }
