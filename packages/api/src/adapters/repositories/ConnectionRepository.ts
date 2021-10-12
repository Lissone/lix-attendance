import { Repository, getRepository } from 'typeorm'

import { IConnection } from '@entities/IConnection'
import { ConnectionEntity } from '@external/database/entities/ConnectionEntity'
import { IConnectionCreate, IConnectionRepository } from '@useCases/connection/IConnectionRepository'

export class ConnectionRepository implements IConnectionRepository {
  private get repository () : Repository<IConnection> {
    return getRepository(ConnectionEntity)
  }

  async getAllWithoutAdmin () : Promise<IConnection[]> {
    const connections = await this.repository.find({ where: { adminSocket: null }, relations: ['user'] })

    return connections
  }

  async getOneByUserId (clientId: string) : Promise<IConnection | undefined> {
    const connection = await this.repository.findOne({ clientId })

    return connection
  }

  async getOneByUserSocket (clientSocket: string) : Promise<IConnection | undefined> {
    const connection = await this.repository.findOne({ clientSocket })

    return connection
  }

  async create ({ id, adminId, adminSocket, clientId, clientSocket }: IConnectionCreate) : Promise<IConnection> {
    const connection = this.repository.create({
      id,
      adminId,
      adminSocket,
      clientId,
      clientSocket
    })

    await this.repository.save(connection)

    return connection
  }

  async updateAdminSocket (connection: IConnection) : Promise<IConnection> {
    const ret = await this.repository.save(connection)

    return ret
  }
}
