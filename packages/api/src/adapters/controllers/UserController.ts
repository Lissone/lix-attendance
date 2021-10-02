import { Request, Response } from 'express'

import { UserUseCase } from '@useCases/user/userUseCase'

export class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      const usersService = new UserUseCase()

      const user = await usersService.create(email)

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}