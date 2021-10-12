import { IConnection } from '@entities/IConnection'

interface IConnectionCreate {
  id?:string
  adminId?: string
  adminSocket?: string
  clientId: string
  clientSocket: string
}

interface IConnectionRepository {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getOneByUserId(clientId: string) : Promise<IConnection | undefined>
  getOneByUserSocket(clientSocket: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  updateAdminSocket(connection: IConnection) : Promise<IConnection>
}

export { IConnectionRepository, IConnectionCreate }
