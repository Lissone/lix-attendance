import { IConnection } from '@entities/IConnection'

interface IConnectionCreate {
  id?:string
  adminSocket?: string
  userSocket: string
  userId: string
}

interface IConnectionRepository {
  getAllWithoutAdmin() : Promise<IConnection[]>
  getOneByUserId(userId: string) : Promise<IConnection | undefined>
  getOneByUserSocket(userSocket: string) : Promise<IConnection | undefined>
  create(connection: IConnectionCreate) : Promise<IConnection>
  updateAdminSocket(connection: IConnection) : Promise<IConnection>
}

export { IConnectionRepository, IConnectionCreate }
