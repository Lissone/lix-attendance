import { IUser } from '@entities/IUser'

interface IUserRepository {
  getOneByEmail (email: string) : Promise<IUser>
  create(email: string) : Promise<IUser>
}

export { IUserRepository }
