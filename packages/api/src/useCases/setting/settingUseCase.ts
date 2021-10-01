import { getCustomRepository, Repository } from 'typeorm'

import { Setting } from '../entities/Setting'
import { SettingsRepository } from '../adapters/repositories/SettingsRepository'

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

  async getOneByUsername (username: string) {
    const settings = await this.settingsRepository.findOne({ username })

    return settings
  }

  async update (username: string, chat: boolean) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', { username })
      .execute()
  }
}
