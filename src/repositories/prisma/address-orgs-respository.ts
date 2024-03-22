import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AddressOrgsResponsitory } from '../address-orgs-respository'

export class PrismaAddressOrgsRepository implements AddressOrgsResponsitory {
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const userOrg = await prisma.address.create({
      data,
    })

    return userOrg
  }
}
