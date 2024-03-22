import { PrismaAddressOrgsRepository } from '@/repositories/prisma/address-orgs-respository'
import { RegisterAddressUseCase } from '../register-address-org'

export function makeRegisterAddressOrgUseCase() {
  const addressOrgsRepository = new PrismaAddressOrgsRepository()
  const useCase = new RegisterAddressUseCase(addressOrgsRepository)

  return useCase
}
