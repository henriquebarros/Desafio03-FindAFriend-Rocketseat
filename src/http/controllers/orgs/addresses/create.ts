import { makeRegisterAddressOrgUseCase } from '@/use-cases/factories/make-register-address-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const addressSchema = z.object({
    address: z.string(),
    number_address: z.string(),
    state: z.string(),
    city: z.string(),
    postal_code: z.string(),
  })

  const { address, number_address, state, city, postal_code } =
    addressSchema.parse(request.body)
  const registerAddressOrgUseCase = makeRegisterAddressOrgUseCase()
  await registerAddressOrgUseCase.execute({
    user_org_id: request.user.sub,
    address,
    number_address,
    state,
    city,
    postal_code,
  })

  return reply.status(201).send()
}
