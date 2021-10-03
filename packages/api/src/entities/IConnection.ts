import { IUser } from './IUser'

interface IConnection {
  id: string
  adminSocket?: string
  userId: string
  userSocket: string
  createdAt: Date
  updatedAt: Date
  user: IUser
}

export { IConnection }
