import { Request, Response } from 'express'

import { IConnectionUseCase } from '@useCases/connection/IConnectionUseCase'

export class ConnectionController {
  useCase: IConnectionUseCase

  constructor (useCase: IConnectionUseCase) {
    this.useCase = useCase
  }

  async getOne (req: Request, res: Response): Promise<Response> {
    try {
      const { connectionId } = req.params

      if (!connectionId) {
        return res.sendStatus(400)
      }

      const connection = await this.useCase.getOne(connectionId)

      return res.status(200).json(connection)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
