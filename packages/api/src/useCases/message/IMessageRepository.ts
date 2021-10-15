import { IMessage } from '@entities/IMessage'

interface IMessageCreate {
  adminId?: string
  clientId: string
  text: string
}

interface IMessageRepository {
  getAllByClientId(clientId: string) : Promise<IMessage[]>
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageRepository, IMessageCreate }
