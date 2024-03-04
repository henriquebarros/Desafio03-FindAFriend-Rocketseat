import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersOrgsResponsitory } from '../users-ongs-repository'

export class PrismaUserOrgsRepository implements UsersOrgsResponsitory {
  async findById(id: string) {
    const userOrg = await prisma.userOrg.findUnique({
      where: {
        id,
      },
    })

    return userOrg
  }

  async findByEmail(email: string) {
    const userOrg = await prisma.userOrg.findUnique({
      where: {
        email,
      },
    })

    return userOrg
  }

  async create(data: Prisma.UserOrgCreateInput) {
    const userOrg = await prisma.userOrg.create({
      data,
    })

    return userOrg
  }
}
