import { Repository, getRepository } from 'typeorm'

import { IMessage } from '@entities/IMessage'
import { MessageEntity } from '@external/database/entities/MessageEntity'
import { IMessageRepository, IMessageCreate } from '@useCases/message/IMessageRepository'

export class MessageRepository implements IMessageRepository {
  private get repository () : Repository<IMessage> {
    return getRepository(MessageEntity)
  }

  async getAllByUser () : Promise<IMessage[]> {
    const connections = await this.repository.find({ where: { adminSocket: null }, relations: ['user'] })

    return connections
  }

  async create ({ adminSocket, userId, text }: IMessageCreate) : Promise<IMessage> {
    const message = await this.repository.create({ adminSocket, text, userId })

    await this.repository.save(message)

    return message
  }
}
