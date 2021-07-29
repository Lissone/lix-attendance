/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm'

import { Connection } from '../entities/Connection'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'

interface IConnectionCreate {
  id?:string
  admin_id?: string
  socket_id: string
  user_id: string
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>

  constructor () {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create ({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      id,
      admin_id,
      socket_id,
      user_id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async getOneByUserId (user_id: string) {
    const connection = await this.connectionsRepository.findOne({ user_id })

    return connection
  }

  async getAllWithoutAdmin () {
    const connections = await this.connectionsRepository.find({ where: { admin_id: null }, relations: ['user'] })

    return connections
  }

  async getOneBySocketId (socket_id: string) {
    const connection = await this.connectionsRepository.findOne({ socket_id })

    return connection
  }
}
