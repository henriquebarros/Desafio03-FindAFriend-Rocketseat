import { Prisma, Address } from '@prisma/client'
import { AddressOrgsResponsitory } from '../address-orgs-respository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressOrgsRespository implements AddressOrgsResponsitory {
  itens: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: data.id ?? randomUUID(),
      address: data.address,
      number_address: data.number_address ?? null,
      state: data.state,
      city: data.city,
      postal_code: data.postal_code,
      user_org_id: data.user_org_id,
      updated_at: new Date(),
    }

    this.itens.push(address)

    return address
  }
}
