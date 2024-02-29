import { PrismaUserOrgsRepository } from '@/repositories/prisma/prisma-user-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userOrgsRepository = new PrismaUserOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(userOrgsRepository)

  return authenticateUseCase
}
