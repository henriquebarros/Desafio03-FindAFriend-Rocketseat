import { Prisma, Address } from '@prisma/client'

export interface AddressOrgsResponsitory {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
  findAddressById(orgId: string): Promise<Address | null>
}
// .CheckInUncheckedCreateInput
