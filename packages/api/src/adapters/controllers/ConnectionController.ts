import { Request, Response } from 'express'

import { IConnectionUseCase } from '@useCases/connection/IConnectionUseCase'

export class ConnectionController {
  useCase: IConnectionUseCase

  constructor (useCase: IConnectionUseCase) {
    this.useCase = useCase
  }

  async getAllUnclosedByAdminId (req: Request, res: Response): Promise<Response> {
    try {
      const { adminId } = req.params

      if (!adminId) {
        return res.sendStatus(400)
      }

      const connections = await this.useCase.getAllUnclosedByAdminId(adminId)

      return res.status(200).json(connections)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
