import { EntitySchema } from 'typeorm'

import { IUser } from '@entities/IUser'

const UserEntity = new EntitySchema<IUser>({
  name: 'user',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    email: {
      type: String,
      nullable: false
    },
    createdAt: {
      name: 'createdAt',
      type: 'datetime2',
      createDate: true
    }
  }
})

export { UserEntity }
