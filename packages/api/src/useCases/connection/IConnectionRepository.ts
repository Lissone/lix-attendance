import { IConnection } from '@entities/IConnection'

interface IConnectionCreate {
  id?:string
  adminId?: string
  clientId: string
}

interface IConnectionRepository {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getAllByAdminId(adminId: string) : Promise<IConnection[]>
  getAllUnclosedByAdminId(adminId: string) : Promise<IConnection[]>
  getOneByClientId(clientId: string) : Promise<IConnection | undefined>
  // getOneByClientSocket(clientSocket: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  updateAdminSocket(connection: IConnection) : Promise<IConnection>
}

export { IConnectionRepository, IConnectionCreate }
