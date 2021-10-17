import { IUser } from '@entities/IUser'
import { IUserCreate } from './IUserUseCase'

interface IUserRepository {
  getOne (userId: string) : Promise<IUser | undefined>
  getOneByEmail (email: string) : Promise<IUser | undefined>
  create(user: IUserCreate) : Promise<IUser>
  update(user: IUser) : Promise<IUser>
}

export { IUserRepository }
