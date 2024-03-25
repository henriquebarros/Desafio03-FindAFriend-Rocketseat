import { Address } from '@prisma/client'
import { AddressOrgsResponsitory } from '@/repositories/address-orgs-repository'

interface RegisterAddressUseCaseRequest {
  user_org_id: string
  address: string
  number_address: string
  state: string
  city: string
  postal_code: string
}

interface RegisterAddressUseCaseResponse {
  address: Address
}

export class RegisterAddressUseCase {
  constructor(private addressOrgsResponsitory: AddressOrgsResponsitory) {}

  async execute({
    user_org_id,
    address,
    number_address,
    state,
    city,
    postal_code,
  }: RegisterAddressUseCaseRequest): Promise<RegisterAddressUseCaseResponse> {
    const address_data = await this.addressOrgsResponsitory.create({
      user_org_id,
      address,
      number_address,
      state,
      city,
      postal_code,
    })

    return {
      address: address_data,
    }
  }
}
