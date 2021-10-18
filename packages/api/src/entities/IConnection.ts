import { IMessage } from './IMessage'
import { IUser } from './IUser'

interface IConnection {
  id: string
  adminId?: string
  clientId: string
  closedAt: Date | null
  createdAt: Date
  updatedAt: Date
  messages: IMessage[]
  admin?: IUser
  client: IUser
}

export { IConnection }
