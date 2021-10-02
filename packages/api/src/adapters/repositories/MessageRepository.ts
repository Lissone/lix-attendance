import { EntityRepository, Repository } from 'typeorm'

import { IMessage } from '@entities/IMessage'
import { MessageEntity } from '@external/database/entities/MessageEntity'

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<IMessage> {

}
