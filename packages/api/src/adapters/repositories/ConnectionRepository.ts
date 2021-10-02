import { EntityRepository, Repository } from 'typeorm'

import { IConnection } from '@entities/IConnection'
import { ConnectionEntity } from '@external/database/entities/ConnectionEntity'

@EntityRepository(ConnectionEntity)
export class ConnectionRepository extends Repository<IConnection> {

}
