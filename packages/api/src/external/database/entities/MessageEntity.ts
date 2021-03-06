import { EntitySchema } from 'typeorm'

import { IMessage } from '@entities/IMessage'

const MessageEntity = new EntitySchema<IMessage>({
  name: 'message',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    connectionId: {
      type: String,
      nullable: false
    },
    adminId: {
      type: String,
      nullable: true
    },
    clientId: {
      type: String,
      nullable: false
    },
    text: {
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
    connection: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'connectionId'
      }),
      target: 'connection',
      nullable: true
    },
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

export { MessageEntity }
