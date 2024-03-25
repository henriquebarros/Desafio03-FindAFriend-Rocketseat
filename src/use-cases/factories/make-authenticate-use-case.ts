import { PrismaUserOrgsRepository } from '@/repositories/prisma/prisma-user-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userOrgsRepository = new PrismaUserOrgsRepository()
  const useCase = new AuthenticateUseCase(userOrgsRepository)

  return useCase
}
