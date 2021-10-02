import { EntityRepository, Repository } from 'typeorm'

import { IUser } from '@entities/IUser'
import { UserEntity } from '@external/database/entities/UserEntity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<IUser> {

}
