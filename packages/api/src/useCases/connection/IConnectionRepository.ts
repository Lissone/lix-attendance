import { IConnection } from '@entities/IConnection'

interface IConnectionCreate {
  id?:string
  adminId?: string
  clientId: string
}

interface IConnectionUpdate {
  id: string
  adminId: string
  clientId: string
  createdAt: Date
  updatedAt: Date
  closedAt?: Date
}

interface IConnectionRepository {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getAllByAdminId(adminId: string) : Promise<IConnection[]>
  getAllUnclosedByAdminId(adminId: string) : Promise<IConnection[]>
  getOne(connectionId: string) : Promise<IConnection | undefined>
  getOneByClientId(clientId: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  update(connection: IConnectionUpdate) : Promise<IConnection>
}

export { IConnectionRepository, IConnectionCreate, IConnectionUpdate }
