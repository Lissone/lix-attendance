import { Repository, getRepository } from 'typeorm'

import { IMessage } from '@entities/IMessage'
import { MessageEntity } from '@external/database/entities/MessageEntity'
import { IMessageRepository, IMessageCreate } from '@useCases/message/IMessageRepository'

export class MessageRepository implements IMessageRepository {
  private get repository () : Repository<IMessage> {
    return getRepository(MessageEntity)
  }

  async getAllByClient () : Promise<IMessage[]> {
    const connections = await this.repository.find({ relations: ['client', 'admin'] })

    return connections
  }

  async create (message: IMessageCreate) : Promise<IMessage> {
    const ret = await this.repository.create(message)

    await this.repository.save(ret)

    return ret
  }
}
