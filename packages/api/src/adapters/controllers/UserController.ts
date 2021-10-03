import { Request, Response } from 'express'

import { IUserUseCase } from '@useCases/user/IUserUseCase'

export class UserController {
  useCase: IUserUseCase

  constructor (useCase: IUserUseCase) {
    this.useCase = useCase
  }

  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      const user = await this.useCase.create(email)

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
