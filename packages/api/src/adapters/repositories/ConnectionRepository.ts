import { Repository, getRepository } from 'typeorm'

import { IConnection } from '@entities/IConnection'
import { ConnectionEntity } from '@external/database/entities/ConnectionEntity'
import { IConnectionCreate, IConnectionRepository } from '@useCases/connection/IConnectionRepository'

export class ConnectionRepository implements IConnectionRepository {
  private get repository () : Repository<IConnection> {
    return getRepository(ConnectionEntity)
  }

  async getAllWithoutAdmin () : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminSocket: null }, relations: ['client'] })

    return connections
  }

  async getAllByAdminId (adminId: string) : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminId: adminId }, relations: ['client', 'admin'] })

    return connections
  }

  async getOneByClientId (clientId: string) : Promise<IConnection | undefined> {
    const connection = await this.repository.findOne({ clientId })

    return connection
  }

  async create ({ id, adminId, clientId }: IConnectionCreate) : Promise<IConnection> {
    const connection = this.repository.create({
      id,
      adminId,
      clientId
    })

    await this.repository.save(connection)

    return connection
  }

  async updateAdminSocket (connection: IConnection) : Promise<IConnection> {
    const ret = await this.repository.save(connection)

    return ret
  }
}
