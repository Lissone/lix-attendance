import { IMessage } from '@entities/IMessage'

interface IMessageCreate {
  adminSocket?: string
  userId: string
  text: string
}

interface IMessageRepository {
  getAllByUser(userId: string) : Promise<IMessage[]>
  create(message: IMessageCreate) : Promise<IMessage>
}

export { IMessageRepository, IMessageCreate }
