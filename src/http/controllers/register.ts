import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const { name, email, whatsapp, password } = registerBodySchema.parse(
    request.body,
  )

  await prisma.userOrg.create({
    data: {
      name,
      email,
      whatsapp,
      password_hash: password,
    },
  })

  return reply.status(201).send()
}
