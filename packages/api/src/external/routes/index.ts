import { Router } from 'express'

import { UserController } from '@controllers/UserController'
import { MessageController } from '@controllers/MessageController'

export const apiRoutes = Router()

const userController = new UserController()
const messageController = new MessageController()

apiRoutes.post('/api/v1/users', (req, res) => userController.create(req, res))

apiRoutes.post('/api/v1/messages', (req, res) => messageController.create(req, res))
apiRoutes.get('/api/v1/messages/:id', (req, res) => messageController.getAllByUser(req, res))
