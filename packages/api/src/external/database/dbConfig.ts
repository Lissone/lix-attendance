import { createConnection } from 'typeorm'

import { UserEntity } from './entities/UserEntity'
import { MessageEntity } from './entities/MessageEntity'
import { ConnectionEntity } from './entities/ConnectionEntity'

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, MessageEntity, ConnectionEntity],
  synchronize: false,
  logging: false,
  options: {
    enableArithAbort: true
  }
})

export { connection }
