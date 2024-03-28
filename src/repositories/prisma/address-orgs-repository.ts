import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AddressOrgsResponsitory } from '../address-orgs-repository'

export class PrismaAddressOrgsRepository implements AddressOrgsResponsitory {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const userOrg = await prisma.address.create({
      data,
    })

    return userOrg
  }

  async findAddressById(orgId: string) {
    const address = await prisma.address.findFirst({
      where: {
        user_org_id: orgId,
      },
    })

    return address
  }
}
