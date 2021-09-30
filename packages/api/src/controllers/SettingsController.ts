import { Request, Response } from 'express'

import { SettingsService } from '../services/SettingsService'

export class SettingsController {
  async create (req: Request, res: Response) {
    try {
      const { chat, username } = req.body

      const settingsService = new SettingsService()

      const settings = await settingsService.create({
        chat,
        username
      })

      return res.status(201).json(settings)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }

  async getOneByUsername (req: Request, res: Response) {
    try {
      const { username } = req.params

      const settingsService = new SettingsService()

      const settings = await settingsService.getOneByUsername(username)

      return res.status(200).json(settings)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { username } = req.params
      const { chat } = req.body

      const settingsService = new SettingsService()

      await settingsService.update(username, chat)

      return res.sendStatus(200)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}
