import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export const usersOrgsRoutes = async (app: FastifyInstance) => {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
