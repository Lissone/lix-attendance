import { Router } from 'express'

import { SettingsController } from '../controllers/SettingsController'
import { UsersController } from '../controllers/UsersController'

export const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()

routes.post('/api/v1/settings', (req, res) => settingsController.create(req, res))
routes.post('/api/v1/users', (req, res) => usersController.create(req, res))
