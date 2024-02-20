import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserOrgsRepository } from '@/repositories/prisma/prisma-user-orgs-repository'
import { UserOrgAlreadyExistsError } from '@/use-cases/errors/user-org-already-exists-error'

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
    const prismaUserOrgsRepository = new PrismaUserOrgsRepository()
    const registerUseCase = new RegisterUseCase(prismaUserOrgsRepository)
    await registerUseCase.execute({
      name,
      email,
      whatsapp,
      password,
    })
  } catch (err) {
    if (err instanceof UserOrgAlreadyExistsError) {
      return reply.status(406).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
