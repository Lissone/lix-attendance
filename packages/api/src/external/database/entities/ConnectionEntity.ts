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
    adminSocket: {
      type: String,
      nullable: true
    },
    userId: {
      type: String,
      nullable: false
    },
    userSocket: {
      type: String,
      nullable: false
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
    user: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'userId'
      }),
      target: 'user',
      nullable: false
    }
  }
})

export { ConnectionEntity }
