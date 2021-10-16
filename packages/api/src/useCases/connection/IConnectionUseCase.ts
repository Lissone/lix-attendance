import { IConnection } from '@entities/IConnection'
import { IConnectionCreate } from './IConnectionRepository'

interface IConnectionUseCase {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getAllByAdminId(adminId: string) : Promise<IConnection[]>
  getAllUnclosedByAdminId(adminId: string) : Promise<IConnection[]>
  getOne(connectionId: string) : Promise<IConnection | undefined>
  getOneByClientId(clientId: string) : Promise<IConnection | undefined>
  // getOneByClientSocket(clientSocket: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  updateAdminSocket(userId: string, adminSocket: string) : Promise<IConnection>
}

export { IConnectionUseCase }
