/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'

import { Message } from '../entities/Message'
import { MessagesRepository } from '../adapters/repositories/MessagesRepository'

interface IMessageCreate {
  admin_id?: string
  user_id: string
  text: string
}

export class MessagesService {
  private messagesRepository: Repository<Message>

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create ({ admin_id, user_id, text }: IMessageCreate) {
    const message = await this.messagesRepository.create({ admin_id, text, user_id })

    await this.messagesRepository.save(message)

    return message
  }

  async getAllByUser (user_id: string) {
    const messages = await this.messagesRepository.find({ where: { user_id }, relations: ['user'] })

    return messages
  }
}
