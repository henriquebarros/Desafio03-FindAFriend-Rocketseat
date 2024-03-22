import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export const addressesOrgsRoutes = async (app: FastifyInstance) => {
  /** Atuthenticated */
  app.post('/orgs/address', { onRequest: [verifyJWT] }, create)
}
