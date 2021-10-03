import { IUser } from '@entities/IUser'

interface IUserUseCase {
  getOneByEmail (email: string) : Promise<IUser>
  create(email: string) : Promise<IUser>
}

export { IUserUseCase }
