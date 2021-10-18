import { IMessage } from '@entities/IMessage'

interface IMessageCreate {
  connectionId: string
  adminId?: string
  clientId: string
  text: string
}

interface IMessageRepository {
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageRepository, IMessageCreate }
