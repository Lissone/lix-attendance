import { Request, Response } from 'express'

import { MessageRepository } from '@repositories/messageRepository'
import { MessageUseCase } from '@useCases/message/messageUseCase'

export class MessageController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { adminSocket, userId, text } = req.body

      const messageRepository = new MessageRepository()
      const messageUseCase = new MessageUseCase(messageRepository)

      const message = await messageUseCase.create({ adminSocket, userId, text })

      return res.status(201).json(message)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const messageRepository = new MessageRepository()
      const messageUseCase = new MessageUseCase(messageRepository)

      const messages = await messageUseCase.getAllByUser(id)

      return res.status(200).json(messages)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
