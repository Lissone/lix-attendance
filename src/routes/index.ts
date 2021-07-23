import { Router } from 'express'

import { SettingsController } from '../controllers/SettingsController'

export const apiRoutes = Router()

const settingsController = new SettingsController()

apiRoutes.post('/api/v1/settings', (req, res) => settingsController.create(req, res))
