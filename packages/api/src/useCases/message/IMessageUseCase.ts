import { IMessage } from '@entities/IMessage'
import { IMessageCreate } from './IMessageRepository'

interface IMessageUseCase {
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageUseCase }
