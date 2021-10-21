import { IConnection } from '@entities/IConnection'
import { IConnectionCreate, IConnectionUpdate } from './IConnectionRepository'

interface IConnectionUseCase {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getAllByAdminId(adminId: string) : Promise<IConnection[]>
  getAllUnclosedByAdminId(adminId: string) : Promise<IConnection[]>
  getOne(connectionId: string) : Promise<IConnection | undefined>
  getOneByClientId(clientId: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  update(connection: IConnectionUpdate) : Promise<IConnection>
  updateWithAdmin(clientId: string, adminId: string) : Promise<IConnection>
}

export { IConnectionUseCase }
