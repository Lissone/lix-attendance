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

  async getAllByAdminId (adminId: string) : Promise<IConnection[]> {
    try {
      const connections = await this.repository.getAllByAdminId(adminId)

      return connections
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAllUnclosedByAdminId (adminId: string) : Promise<IConnection[]> {
    try {
      const connections = await this.repository.getAllUnclosedByAdminId(adminId)

      return connections
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne (connectionId: string) : Promise<IConnection | undefined> {
    try {
      const connection = await this.repository.getOne(connectionId)

      return connection
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOneByClientId (clientId: string) : Promise<IConnection | undefined> {
    try {
      const connection = await this.repository.getOneByClientId(clientId)

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

  async updateWithAdmin (clientId: string, adminId: string) : Promise<IConnection> {
    try {
      const connection = await this.repository.getOneByClientId(clientId)

      const connectionWithAdmin = {
        ...connection,
        adminId
      }

      const ret = await this.repository.update(connectionWithAdmin)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}
