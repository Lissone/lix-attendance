import { Request, Response } from 'express'

import { IMessageUseCase } from '@useCases/message/IMessageUseCase'

export class MessageController {
  useCase: IMessageUseCase

  constructor (useCase: IMessageUseCase) {
    this.useCase = useCase
  }

  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { adminSocket, userId, text } = req.body

      const message = await this.useCase.create({ adminSocket, userId, text })

      return res.status(201).json(message)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  async getAllByUser (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const messages = await this.useCase.getAllByUser(id)

      return res.status(200).json(messages)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
