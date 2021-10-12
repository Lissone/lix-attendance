import { IUser } from '@entities/IUser'
import { IUserCreate } from './IUserUseCase'

interface IUserRepository {
  getOneByEmail (email: string) : Promise<IUser>
  create(user: IUserCreate) : Promise<IUser>
  update(user: IUser) : Promise<IUser>
}

export { IUserRepository }
