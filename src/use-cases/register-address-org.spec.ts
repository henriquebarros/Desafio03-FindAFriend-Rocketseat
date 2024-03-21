import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryAddressOrgsRespository } from '@/repositories/in-memory/in-memory-address-orgs-repository'
import { RegisterAddressUseCase } from './register-address-org'
import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'

let usersOrgsRepository: InMemoryUsersOrgsRepository
let addressOrgsRespository: InMemoryAddressOrgsRespository

let sut: RegisterAddressUseCase

describe('Address Use Case', () => {
  beforeEach(() => {
    usersOrgsRepository = new InMemoryUsersOrgsRepository()
    addressOrgsRespository = new InMemoryAddressOrgsRespository()
    sut = new RegisterAddressUseCase(addressOrgsRespository)
  })

  it('should be able to register an address of a logged in org', async () => {
    const createUserOrg = await usersOrgsRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      whatsapp: '85986254012',
      password_hash: '123456',
    })

    const { address } = await sut.execute({
      address: 'Rua A',
      number_address: '100',
      state: 'CE',
      city: 'Fortaleza',
      postal_code: '60.000-00',
      user_org_id: createUserOrg.id,
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
