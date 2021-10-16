import { Router } from 'express'

import { ConnectionRepository } from '@repositories/ConnectionRepository'
import { UserRepository } from '@repositories/UserRepository'
import { MessageRepository } from '@repositories/MessageRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'
import { MessageUseCase } from '@useCases/message/messageUseCase'

import { ConnectionController } from '@controllers/ConnectionController'
import { UserController } from '@controllers/UserController'
import { MessageController } from '@controllers/MessageController'

export const apiRoutes = Router()

const connectionRepository = new ConnectionRepository()
const connectionUseCase = new ConnectionUseCase(connectionRepository)
const connectionController = new ConnectionController(connectionUseCase)

const userRepository = new UserRepository()
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase, connectionUseCase)

const messageRepository = new MessageRepository()
const messageUseCase = new MessageUseCase(messageRepository)
const messageController = new MessageController(messageUseCase)

apiRoutes.get('/api/v1/connections/:adminId', (req, res) => connectionController.getAllUnclosedByAdminId(req, res))

apiRoutes.post('/api/v1/users', (req, res) => userController.signIn(req, res))

apiRoutes.post('/api/v1/messages', (req, res) => messageController.create(req, res))
apiRoutes.get('/api/v1/messages/:id', (req, res) => messageController.getAllByClient(req, res))
