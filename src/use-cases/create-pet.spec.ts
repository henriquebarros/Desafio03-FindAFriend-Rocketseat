import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let usersOrgsRepository: InMemoryUsersOrgsRepository
let petsRepository: InMemoryPetsRepository

let sut: CreatePetUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    usersOrgsRepository = new InMemoryUsersOrgsRepository()
    petsRepository = new InMemoryPetsRepository()

    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a register of pet', async () => {
    const createUserOrg = await usersOrgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      whatsapp: '85988888888',
      password_hash: '123456',
    })

    const { pet } = await sut.execute({
      user_org_id: createUserOrg.id,
      name: 'caramel',
      sexo: 'M',
      species: 'cachorro',
      race: 'vira-lata',
      characteristics: 'leal,companheiro,protetor,bracalhão',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
