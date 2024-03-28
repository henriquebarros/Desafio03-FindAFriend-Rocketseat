import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryAddressOrgsRespository } from '@/repositories/in-memory/in-memory-address-orgs-repository'
import { UnregisteredAddressError } from './errors/unregistered-address-error'

let usersOrgsRepository: InMemoryUsersOrgsRepository
let petsRepository: InMemoryPetsRepository
let addressOrgsRespository: InMemoryAddressOrgsRespository

let sut: CreatePetUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    usersOrgsRepository = new InMemoryUsersOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    addressOrgsRespository = new InMemoryAddressOrgsRespository()

    sut = new CreatePetUseCase(petsRepository, addressOrgsRespository)
  })

  it('should be able to create a register of pet', async () => {
    const createUserOrg = await usersOrgsRepository.create({
      name: 'Pet',
      email: 'johndoe@exemple.com',
      whatsapp: '85988888888',
      password_hash: '123456',
    })

    await addressOrgsRespository.create({
      address: 'Rua A',
      number_address: '100',
      state: 'CE',
      city: 'Fortaleza',
      postal_code: '60.000-00',
      user_org_id: createUserOrg.id,
    })

    const { pet } = await sut.execute({
      user_org_id: createUserOrg.id,
      name: 'caramel',
      sexo: 'M',
      species: 'cachorro',
      race: 'vira-lata',
      characteristics: 'leal,companheiro,protetor,bricalhão',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to return error if the ORG does not have a registered address', async () => {
    const createUserOrg = await usersOrgsRepository.create({
      name: 'Pet',
      email: 'johndoe@exemple.com',
      whatsapp: '85988888888',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        user_org_id: createUserOrg.id,
        name: 'caramel',
        sexo: 'M',
        species: 'cachorro',
        race: 'vira-lata',
        characteristics: 'leal,companheiro,protetor,bricalhão',
      }),
    ).rejects.toBeInstanceOf(UnregisteredAddressError)
  })
})
