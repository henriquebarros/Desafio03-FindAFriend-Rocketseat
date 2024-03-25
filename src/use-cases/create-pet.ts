import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

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
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    user_org_id,
    name,
    sexo,
    species,
    race,
    characteristics,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
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
