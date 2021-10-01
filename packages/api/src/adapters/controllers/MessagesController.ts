/* eslint-disable camelcase */
import { Request, Response } from 'express'

import { MessagesService } from '../../useCases/MessagesService'

export class MessagesController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { admin_id, user_id, text } = req.body

      const messagesService = new MessagesService()

      const message = await messagesService.create({ admin_id, user_id, text })

      return res.status(201).json(message)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const messagesService = new MessagesService()

      const messages = await messagesService.getAllByUser(id)

      return res.status(200).json(messages)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
