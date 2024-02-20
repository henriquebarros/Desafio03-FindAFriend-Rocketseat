import { prisma } from '@/lib/prisma'
import { PrismaUserOrgsRepository } from '@/repositories/prisma-user-ongs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  whatsapp,
  password,
}: RegisterUseCaseRequest) {
  const orgsWithSameEmail = await prisma.userOrg.findUnique({
    where: {
      email,
    },
  })

  if (orgsWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const password_hash = await hash(password, 6)

  const prismaUserOrgsRepository = new PrismaUserOrgsRepository()

  await prismaUserOrgsRepository.create({
    name,
    email,
    whatsapp,
    password_hash,
  })
}
