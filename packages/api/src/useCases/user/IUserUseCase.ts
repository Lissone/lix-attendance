import { IUser } from '@entities/IUser'

interface IUserCreate {
  name: string
  email: string
  socket: string
}

interface IUserUseCase {
  getOne (userId: string) : Promise<IUser | undefined>
  getOneByEmail (email: string) : Promise<IUser | undefined>
  create (user: IUserCreate) : Promise<IUser>
  update (user: IUser) : Promise<IUser>
}

export { IUserUseCase, IUserCreate }
