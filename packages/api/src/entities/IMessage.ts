import { IUser } from './IUser'

interface IMessage {
  id: string
  adminId?: string
  clientId: string
  text: string
  createdAt: Date
  updatedAt: Date
  admin?: IUser
  client: IUser
}

export { IMessage }
