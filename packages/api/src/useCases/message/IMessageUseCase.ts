import { IMessage } from '@entities/IMessage'
import { IMessageCreate } from './IMessageRepository'

interface IMessageUseCase {
  getAllByUser(userId: string) : Promise<IMessage[]>
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageUseCase }
