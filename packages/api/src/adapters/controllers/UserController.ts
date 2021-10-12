import { Request, Response } from 'express'

import { IUserUseCase } from '@useCases/user/IUserUseCase'

export class UserController {
  useCase: IUserUseCase

  constructor (useCase: IUserUseCase) {
    this.useCase = useCase
  }

  async signIn (req: Request, res: Response): Promise<Response> {
    try {
      const { user } = req.body

      const ret = await this.useCase.create(user)

      return res.status(200).json({ user: ret })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
