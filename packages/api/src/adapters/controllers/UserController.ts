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

        if (user.type === 'client') {
          await this.useCaseConnection.create({
            clientId: ret.id
          })
        }

        return res.status(200).json({ user: ret })
      }

      const userUpdated = await this.useCaseUser.update({
        ...userAlreadyExists,
        socket: user.socket
      })

      if (user.type === 'client') {
        let connection = await this.useCaseConnection.getOneByClientId(userUpdated.id)

        if (!connection) {
          connection = await this.useCaseConnection.create({
            clientId: userUpdated.id
          })
        }

        return res.status(200).json({ user: userUpdated, connectionId: connection.id })
      }

      return res.status(200).json({ user: userUpdated })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }
}
