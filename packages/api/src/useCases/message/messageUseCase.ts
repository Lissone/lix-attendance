import { IMessage } from '@entities/IMessage'
import { IMessageRepository, IMessageCreate } from './IMessageRepository'
import { IMessageUseCase } from './IMessageUseCase'

export class MessageUseCase implements IMessageUseCase {
  repository: IMessageRepository

  constructor (repository: IMessageRepository) {
    this.repository = repository
  }

  async getAllByUser (userId: string) : Promise<IMessage[]> {
    try {
      const messages = await this.repository.getAllByUser(userId)

      return messages
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (connection: IMessageCreate) : Promise<IMessage> {
    try {
      const ret = await this.repository.create(connection)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}
