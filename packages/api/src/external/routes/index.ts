import { Router } from 'express'

import { ConnectionRepository } from '@repositories/ConnectionRepository'
import { UserRepository } from '@repositories/UserRepository'

import { ConnectionUseCase } from '@useCases/connection/connectionUseCase'
import { UserUseCase } from '@useCases/user/userUseCase'

import { ConnectionController } from '@controllers/ConnectionController'
import { UserController } from '@controllers/UserController'

export const apiRoutes = Router()

const connectionRepository = new ConnectionRepository()
const connectionUseCase = new ConnectionUseCase(connectionRepository)
const connectionController = new ConnectionController(connectionUseCase)

const userRepository = new UserRepository()
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase, connectionUseCase)

apiRoutes.get('/api/v1/connections/:connectionId', (req, res) => connectionController.getOne(req, res))

apiRoutes.post('/api/v1/users', (req, res) => userController.signIn(req, res))
