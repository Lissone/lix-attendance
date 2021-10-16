import { Repository, getRepository } from 'typeorm'

import { IConnection } from '@entities/IConnection'
import { ConnectionEntity } from '@external/database/entities/ConnectionEntity'
import { IConnectionCreate, IConnectionRepository } from '@useCases/connection/IConnectionRepository'

export class ConnectionRepository implements IConnectionRepository {
  private get repository () : Repository<IConnection> {
    return getRepository(ConnectionEntity)
  }

  async getAllWithoutAdmin () : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminId: null }, relations: ['client'] })

    return connections
  }

  async getAllByAdminId (adminId: string) : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminId }, relations: ['client', 'admin'] })

    return connections
  }

  async getAllUnclosedByAdminId (adminId: string) : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminId, closedAt: null }, relations: ['client', 'admin'] })

    return connections
  }

  async getOneByClientId (clientId: string) : Promise<IConnection | undefined> {
    const connection = await this.repository.findOne({ clientId })

    return connection
  }

  async create (connection: IConnectionCreate) : Promise<IConnection> {
    this.repository.create(connection)

    const ret = await this.repository.save(connection)

    return ret
  }

  async updateAdminSocket (connection: IConnection) : Promise<IConnection> {
    const ret = await this.repository.save(connection)

    return ret
  }
}
