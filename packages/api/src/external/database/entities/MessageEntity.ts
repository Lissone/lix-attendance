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
    adminSocket: {
      type: String,
      nullable: true
    },
    userId: {
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

export { MessageEntity }
