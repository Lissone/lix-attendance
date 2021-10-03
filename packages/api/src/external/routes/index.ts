import { Router } from 'express'

import { UserRepository } from '@repositories/userRepository'
import { MessageRepository } from '@repositories/messageRepository'

import { MessageUseCase } from '@useCases/message/messageUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

import { UserController } from '@controllers/userController'
import { MessageController } from '@controllers/messageController'

export const apiRoutes = Router()

const userRepository = new UserRepository()
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

const messageRepository = new MessageRepository()
const messageUseCase = new MessageUseCase(messageRepository)
const messageController = new MessageController(messageUseCase)

apiRoutes.post('/api/v1/users', (req, res) => userController.create(req, res))

apiRoutes.post('/api/v1/messages', (req, res) => messageController.create(req, res))
apiRoutes.get('/api/v1/messages/:id', (req, res) => messageController.getAllByUser(req, res))
