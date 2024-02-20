import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserOrgsRepository {
  async create(data: Prisma.UserOrgCreateInput) {
    const userOrg = await prisma.userOrg.create({
      data,
    })

    return userOrg
  }
}
