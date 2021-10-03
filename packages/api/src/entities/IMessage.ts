import { IUser } from './IUser'

interface IMessage {
  id: string
  adminSocket: string
  userId: string
  text: string
  createdAt: Date
  updatedAt: Date
  user: IUser
}

export { IMessage }
