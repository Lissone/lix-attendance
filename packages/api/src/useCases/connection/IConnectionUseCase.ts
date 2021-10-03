import { IConnection } from '@entities/IConnection'
import { IConnectionCreate } from './IConnectionRepository'

interface IConnectionUseCase {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getOneByUserId(userId: string) : Promise<IConnection | undefined>
  getOneByUserSocket(userSocket: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  updateAdminSocket(userId: string, adminSocket: string) : Promise<IConnection>
}

export { IConnectionUseCase }
