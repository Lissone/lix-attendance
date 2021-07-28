import { getCustomRepository, Repository } from 'typeorm'

import { Setting } from '../entities/Setting'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface ISettingCreate {
  username: string,
  chat: boolean
}

export class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor () {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create ({ username, chat }: ISettingCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({ username })

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const settings = await this.settingsRepository.create({
      chat,
      username
    })

    await this.settingsRepository.save(settings)

    return settings
  }
}
