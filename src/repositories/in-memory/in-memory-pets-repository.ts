import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      sexo: data.sexo,
      species: data.species ?? null,
      race: data.race ?? null,
      characteristics: data.characteristics ?? null,
      created_at: new Date(),
      updated_at: new Date(),
      user_org_id: data.user_org_id,
    }

    this.items.push(pet)

    return pet
  }
}
