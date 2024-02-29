import { PrismaUserOrgsRepository } from '@/repositories/prisma/prisma-user-orgs-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUserOrgsRepository = new PrismaUserOrgsRepository()
  const registerUseCase = new RegisterUseCase(prismaUserOrgsRepository)

  return registerUseCase
}
