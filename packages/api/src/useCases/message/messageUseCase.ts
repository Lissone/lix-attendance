import { IMessage } from '@entities/IMessage'
import { IMessageRepository, IMessageCreate } from './IMessageRepository'
import { IMessageUseCase } from './IMessageUseCase'

export class MessageUseCase implements IMessageUseCase {
  repository: IMessageRepository

  constructor (repository: IMessageRepository) {
    this.repository = repository
  }

  async create (message: IMessageCreate) : Promise<IMessage> {
    try {
      const ret = await this.repository.create(message)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}
