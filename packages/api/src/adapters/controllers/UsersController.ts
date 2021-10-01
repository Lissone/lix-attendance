import { Request, Response } from 'express'

import { UserService } from '../../useCases/UserService'

export class UsersController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      const usersService = new UserService()

      const user = await usersService.create(email)

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
