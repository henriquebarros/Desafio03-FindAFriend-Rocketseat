import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerUseCase } from '@/use-cases/register'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { name, email, whatsapp, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    await registerUseCase({
      name,
      email,
      whatsapp,
      password,
    })
  } catch (err) {
    return reply.status(406).send()
  }

  return reply.status(201).send()
}
