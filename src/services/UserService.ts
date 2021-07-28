import { getCustomRepository } from 'typeorm'

import { UsersRepository } from '../repositories/UsersRepository'

export class UserService {
  async create (email) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      return userAlreadyExists
    }

    const user = await usersRepository.create({ email })

    await usersRepository.save(user)

    return user
  }
}
