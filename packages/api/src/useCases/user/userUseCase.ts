import { IUser } from '@entities/IUser'
import { IUserRepository } from './IUserRepository'
import { IUserCreate, IUserUseCase } from './IUserUseCase'

export class UserUseCase implements IUserUseCase {
  repository: IUserRepository

  constructor (repository: IUserRepository) {
    this.repository = repository
  }

  async getOneByEmail (email: string) : Promise<IUser> {
    try {
      const user = await this.repository.getOneByEmail(email)

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (user: IUserCreate) : Promise<IUser> {
    try {
      const ret = await this.repository.create(user)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }

  async update (user: IUser) : Promise<IUser> {
    try {
      const ret = await this.repository.update(user)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}
