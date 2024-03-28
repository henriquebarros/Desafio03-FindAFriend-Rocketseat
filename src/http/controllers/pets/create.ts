import { UnregisteredAddressError } from '@/use-cases/errors/unregistered-address-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  //        user_org_id:,
  const petSchema = z.object({
    name: z.string(),
    sexo: z.enum(['M', 'F']).default('M'),
    species: z.string(),
    race: z.string(),
    characteristics: z.string(),
  })

  const { name, sexo, species, race, characteristics } = petSchema.parse(
    request.body,
  )

  try {
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      user_org_id: request.user.sub,
      name,
      sexo,
      species,
      race,
      characteristics,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UnregisteredAddressError) {
      return reply.status(406).send({ message: err.message })
    }

    return reply.status(500).send()
  }
}
