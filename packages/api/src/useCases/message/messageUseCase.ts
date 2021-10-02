/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'

import { IMessage } from '@entities/IMessage'
import { MessageRepository } from '@repositories/MessageRepository'

interface IMessageCreate {
  adminSocket?: string
  userId: string
  text: string
}

export class MessageUseCase {
  private messagesRepository: Repository<IMessage>

  constructor () {
    this.messagesRepository = getCustomRepository(MessageRepository)
  }

  async create ({ adminSocket, userId, text }: IMessageCreate) {
    const message = await this.messagesRepository.create({ adminSocket, text, userId })

    await this.messagesRepository.save(message)

    return message
  }

  async getAllByUser (userId: string) {
    const messages = await this.messagesRepository.find({ where: { userId }, relations: ['user'] })

    return messages
  }
}
