import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userOrgRepository: InMemoryUsersOrgsRepository
let sut: AuthenticateUseCase

describe('Register Use Case Authecticate', () => {
  beforeEach(() => {
    userOrgRepository = new InMemoryUsersOrgsRepository()
    sut = new AuthenticateUseCase(userOrgRepository)
  })

  it('should be able to register', async () => {
    await userOrgRepository.create({
      name: 'Pet Muzzle Friend',
      email: 'petmuzzlefriend@exemple.com',
      whatsapp: '(85) 98888-4444',
      password_hash: await hash('123456', 6),
    })

    const { userOrg } = await sut.execute({
      email: 'petmuzzlefriend@exemple.com',
      password: '123456',
    })

    expect(userOrg.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userOrgRepository.create({
      name: 'Pet Muzzle Friend',
      email: 'petmuzzlefriend@exemple.com',
      whatsapp: '(85) 98888-4444',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'petmuzzlefriend@exemple.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'petmuzzlefriend@exemple.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
