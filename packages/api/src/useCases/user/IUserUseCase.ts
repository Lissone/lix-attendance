import { IUser } from '@entities/IUser'

interface IUserCreate {
  name: string
  email: string
  socket: string
}

interface IUserUseCase {
  getOneByEmail (email: string) : Promise<IUser>
  create(user: IUserCreate) : Promise<IUser>
  update(user: IUser) : Promise<IUser>
}

export { IUserUseCase, IUserCreate }
