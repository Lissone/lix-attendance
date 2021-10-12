import { IMessage } from '@entities/IMessage'
import { IMessageCreate } from './IMessageRepository'

interface IMessageUseCase {
  getAllByClient(clientId: string) : Promise<IMessage[]>
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageUseCase }
