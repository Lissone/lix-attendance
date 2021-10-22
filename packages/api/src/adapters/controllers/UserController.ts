import { Request, Response } from 'express'

import { IUserUseCase } from '@useCases/user/IUserUseCase'
import { IConnectionUseCase } from '@useCases/connection/IConnectionUseCase'

export class UserController {
  useCaseUser: IUserUseCase
  useCaseConnection: IConnectionUseCase

  constructor (useCaseUser: IUserUseCase, useCaseConnection: IConnectionUseCase) {
    this.useCaseUser = useCaseUser
    this.useCaseConnection = useCaseConnection
  }

  async signIn (req: Request, res: Response): Promise<Response> {
    try {
      const { user } = req.body

      const userAlreadyExists = await this.useCaseUser.getOneByEmail(user.email)

      if (!userAlreadyExists) {
        const ret = await this.useCaseUser.create(user)

        return res.status(200).json({ user: ret })
      }

      const userUpdated = await this.useCaseUser.update({
        ...userAlreadyExists,
        socket: user.socket
      })

      const connectionByClient = await this.useCaseConnection.getOneByClientId(userUpdated.id)

      if (user.type === 'client') {
        const connectionByAdmin = await this.useCaseConnection.getAllByAdminId(userUpdated.id)

        if (connectionByAdmin.length > 0) {
          return res.status(406).json({ message: 'It is not acceptable for an admin to become a customer' })
        }

        if (!connectionByClient) {
          return res.status(200).json({ user: userUpdated })
        }

        return res.status(200).json({ user: userUpdated, connectionId: connectionByClient.id })
      } else {
        if (connectionByClient) {
          return res.status(406).json({ message: 'It is not accepted a client with connection to become an admin' })
        }
      }

      return res.status(200).json({ user: userUpdated })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
