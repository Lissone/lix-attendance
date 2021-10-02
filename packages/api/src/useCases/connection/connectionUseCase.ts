/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'

import { IConnection } from '@entities/IConnection'
import { ConnectionRepository } from '@repositories/ConnectionRepository'

interface IConnectionCreate {
  id?:string
  adminSocket?: string
  userSocket: string
  userId: string
}

export class ConnectionUseCase {
  private connectionsRepository: Repository<IConnection>

  constructor () {
    this.connectionsRepository = getCustomRepository(ConnectionRepository)
  }

  async create ({ userSocket, userId, adminSocket, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      id,
      adminSocket,
      userSocket,
      userId
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async getOneByUserId (userId: string) {
    const connection = await this.connectionsRepository.findOne({ userId })

    return connection
  }

  async getAllWithoutAdmin () {
    const connections = await this.connectionsRepository.find({ where: { admin_id: null }, relations: ['user'] })

    return connections
  }

  async getOneBySocketId (userSocket: string) {
    const connection = await this.connectionsRepository.findOne({ userSocket })

    return connection
  }

  async updateAdminId (userId: string, adminSocket: string) {
    // await this.connectionsRepository
    //   .createQueryBuilder()
    //   .update(Connection)
    //   .set({ userId })
    //   .where('userId = :userId', { userId })
    //   .execute()
  }
}
