import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
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
    password: z.string().min(6),
  })

  const { name, email, whatsapp, password } = registerBodySchema.parse(
    request.body,
  )

  const orgsWithSameEmail = await prisma.userOrg.findUnique({
    where: {
      email,
    },
  })

  if (orgsWithSameEmail) {
    return reply.status(406).send()
  }

  const password_hash = await hash(password, 6)

  await prisma.userOrg.create({
    data: {
      name,
      email,
      whatsapp,
      password_hash,
    },
  })

  return reply.status(201).send()
}
