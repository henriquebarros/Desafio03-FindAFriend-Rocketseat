import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export const petsRoutes = async (app: FastifyInstance) => {
  /** Atuthenticated */
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
