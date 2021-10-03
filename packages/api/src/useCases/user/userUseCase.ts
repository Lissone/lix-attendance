import { IUser } from '@entities/IUser'
import { IUserRepository } from './IUserRepository'
import { IUserUseCase } from './IUserUseCase'

export class UserUseCase implements IUserUseCase {
  repository: IUserRepository

  constructor (repository: IUserRepository) {
    this.repository = repository
  }

  async getOneByEmail (userId: string) : Promise<IUser> {
    try {
      const user = await this.repository.getOneByEmail(userId)

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (email: string) : Promise<IUser> {
    try {
      const userAlreadyExists = await this.repository.getOneByEmail(email)

      if (userAlreadyExists) {
        return userAlreadyExists
      }

      const user = await this.repository.create(email)

      return user
    } catch (err) {
      throw new Error(err)
    }
  }
}
