import { Router } from 'express'

import { UserController } from '@controllers/userController'
import { MessageController } from '@controllers/messageController'

export const apiRoutes = Router()

const userController = new UserController()
const messageController = new MessageController()

apiRoutes.post('/api/v1/users', (req, res) => userController.create(req, res))

apiRoutes.post('/api/v1/messages', (req, res) => messageController.create(req, res))
apiRoutes.get('/api/v1/messages/:id', (req, res) => messageController.getAllByUser(req, res))
