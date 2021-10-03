import { Repository, getRepository } from 'typeorm'

import { IUser } from '@entities/IUser'
import { UserEntity } from '@external/database/entities/UserEntity'
import { IUserRepository } from '@useCases/user/IUserRepository'

export class UserRepository implements IUserRepository {
  private get repository () : Repository<IUser> {
    return getRepository(UserEntity)
  }

  async getOneByEmail (email: string) : Promise<IUser> {
    const user = await this.repository.findOne({ email })

    return user
  }

  async create (email: string) : Promise<IUser> {
    const user = await this.repository.create({ email })

    await this.repository.save(user)

    return user
  }
}
