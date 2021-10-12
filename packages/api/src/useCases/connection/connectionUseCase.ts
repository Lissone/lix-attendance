import { IConnection } from '@entities/IConnection'
import { IConnectionCreate, IConnectionRepository } from './IConnectionRepository'
import { IConnectionUseCase } from './IConnectionUseCase'

export class ConnectionUseCase implements IConnectionUseCase {
  repository: IConnectionRepository

  constructor (repository: IConnectionRepository) {
    this.repository = repository
  }

  async getAllWithoutAdmin () : Promise<IConnection[]> {
    try {
      const connections = await this.repository.getAllWithoutAdmin()

      return connections
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOneByUserId (userId: string) : Promise<IConnection | undefined> {
    try {
      const connection = await this.repository.getOneByUserId(userId)

      return connection
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOneByUserSocket (userSocket: string) : Promise<IConnection | undefined> {
    try {
      const connection = await this.repository.getOneByUserSocket(userSocket)

      return connection
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (connection: IConnectionCreate) : Promise<IConnection> {
    try {
      const ret = await this.repository.create(connection)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateAdminSocket (clientId: string, adminSocket: string) : Promise<IConnection> {
    try {
      const connection = await this.repository.getOneByUserId(clientId)

      const connectionWithNewAdminSocket = {
        adminSocket,
        ...connection
      }

      const ret = await this.repository.updateAdminSocket(connectionWithNewAdminSocket)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}
