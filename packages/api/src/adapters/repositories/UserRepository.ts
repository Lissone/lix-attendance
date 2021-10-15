import { Repository, getRepository } from 'typeorm'

import { IUser } from '@entities/IUser'
import { IUserCreate } from '@useCases/user/IUserUseCase'
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

  async create (user: IUserCreate) : Promise<IUser> {
    await this.repository.create(user)

    const ret = await this.repository.save(user)

    return ret
  }

  async update (user: IUser) : Promise<IUser> {
    const ret = await this.repository.save(user)

    return ret
  }
}
