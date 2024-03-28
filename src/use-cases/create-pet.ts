import { AddressOrgsResponsitory } from '@/repositories/address-orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { UnregisteredAddressError } from './errors/unregistered-address-error'

interface CreatePetUseCaseRequest {
  user_org_id: string
  name: string
  sexo: 'F' | 'M'
  species?: string
  race?: string
  characteristics: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private addressOrgsResponsitory: AddressOrgsResponsitory,
  ) {}

  async execute({
    user_org_id,
    name,
    sexo,
    species,
    race,
    characteristics,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const findAddressOrg =
      await this.addressOrgsResponsitory.findAddressById(user_org_id)
    console.log(findAddressOrg)
    if (!findAddressOrg) {
      throw new UnregisteredAddressError()
    }

    const pet = await this.petsRepository.create({
      user_org_id,
      name,
      sexo,
      species,
      race,
      characteristics,
    })

    return {
      pet,
    }
  }
}
