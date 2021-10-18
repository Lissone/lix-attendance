import { IConnection } from './IConnection'
import { IUser } from './IUser'

interface IMessage {
  id: string
  connectionId: string
  adminId?: string
  clientId: string
  text: string
  createdAt: Date
  updatedAt: Date
  connection?: IConnection
  admin?: IUser
  client: IUser
}

export { IMessage }
