import { getCustomRepository, Repository } from 'typeorm'

import { User } from '../entities/User'
import { UsersRepository } from '../adapters/repositories/UsersRepository'

export class UserService {
  private usersRepository: Repository<User>

  constructor () {
    this.usersRepository = getCustomRepository(UsersRepository)
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
