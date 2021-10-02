import { getCustomRepository, Repository } from 'typeorm'

import { IUser } from '@entities/IUser'
import { UserRepository } from '@repositories/UserRepository'

export class UserUseCase {
  private usersRepository: Repository<IUser>

  constructor () {
    this.usersRepository = getCustomRepository(UserRepository)
  }

  async create (email) {
    const userAlreadyExists = await this.usersRepository.findOne({ email })

    if (userAlreadyExists) {
      return userAlreadyExists
    }

    const user = await this.usersRepository.create({ email })

    await this.usersRepository.save(user)

    return user
  }

  async findByEmail (email: string) {
    const user = await this.usersRepository.findOne({ email })

    return user
  }
}
