import { Router } from 'express'

import { SettingsController } from '../controllers/SettingsController'
import { UsersController } from '../controllers/UsersController'
import { MessagesController } from '../controllers/MessagesController'

export const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

routes.post('/api/v1/settings', (req, res) => settingsController.create(req, res))
routes.post('/api/v1/users', (req, res) => usersController.create(req, res))
routes.post('/api/v1/messages', (req, res) => messagesController.create(req, res))
routes.get('/api/v1/messages/:id', (req, res) => messagesController.getAllByUser(req, res))
