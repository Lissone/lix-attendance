import { EntitySchema } from 'typeorm'

import { IConnection } from '@entities/IConnection'

const ConnectionEntity = new EntitySchema<IConnection>({
  name: 'connection',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    adminId: {
      type: String,
      nullable: true
    },
    clientId: {
      type: String,
      nullable: false
    },
    closedAt: {
      name: 'closedAt',
      type: 'datetime2',
      nullable: true
    },
    createdAt: {
      name: 'createdAt',
      type: 'datetime2',
      createDate: true
    },
    updatedAt: {
      name: 'updatedAt',
      type: 'datetime2',
      updateDate: true
    }
  },
  relations: {
    admin: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'adminId'
      }),
      target: 'user',
      nullable: true
    },
    client: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'clientId'
      }),
      target: 'user',
      nullable: false
    }
  }
})

export { ConnectionEntity }
