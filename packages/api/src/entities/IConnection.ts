import { IUser } from './IUser'

interface IConnection {
  id: string
  adminId?: string
  clientId: string
  createdAt: Date
  updatedAt: Date
  admin?: IUser
  client: IUser
}

export { IConnection }
