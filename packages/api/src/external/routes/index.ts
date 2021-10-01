import { Router } from 'express'

import { SettingsController } from '../../adapters/controllers/SettingsController'
import { UsersController } from '../../adapters/controllers/UsersController'
import { MessagesController } from '../../adapters/controllers/MessagesController'

export const apiRoutes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

apiRoutes.post('/api/v1/settings', (req, res) => settingsController.create(req, res))
apiRoutes.get('/api/v1/settings/:username', (req, res) => settingsController.getOneByUsername(req, res))
apiRoutes.put('/api/v1/settings/:username', (req, res) => settingsController.update(req, res))

apiRoutes.post('/api/v1/users', (req, res) => usersController.create(req, res))

// talvez não seja necessário para o funcionamento da aplicação em si
apiRoutes.post('/api/v1/messages', (req, res) => messagesController.create(req, res))
apiRoutes.get('/api/v1/messages/:id', (req, res) => messagesController.getAllByUser(req, res))
