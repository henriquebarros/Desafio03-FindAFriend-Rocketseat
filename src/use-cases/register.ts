import { prisma } from '@/lib/prisma'
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

  await prisma.userOrg.create({
    data: {
      name,
      email,
      whatsapp,
      password_hash,
    },
  })
}
