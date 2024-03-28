import { PrismaAddressOrgsRepository } from '@/repositories/prisma/address-orgs-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const addressOrgsRepository = new PrismaAddressOrgsRepository()
  const useCase = new CreatePetUseCase(petsRepository, addressOrgsRepository)

  return useCase
}
