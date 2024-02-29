import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register Use Case Authecticate', () => {
  it('should be able to register', async () => {
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const sut = new AuthenticateUseCase(userOrgRepository)

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
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const sut = new AuthenticateUseCase(userOrgRepository)

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
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const sut = new AuthenticateUseCase(userOrgRepository)

    await expect(() =>
      sut.execute({
        email: 'petmuzzlefriend@exemple.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
