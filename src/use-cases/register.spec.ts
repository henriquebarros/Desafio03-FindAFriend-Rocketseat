import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { UserOrgAlreadyExistsError } from './errors/user-org-already-exists-error'

describe('Register Use Case', () => {
  it('should hash user org password upon registration', async () => {
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const registerUseCase = new RegisterUseCase(userOrgRepository)

    const { userOrg } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      whatsapp: '85986254012',
      password: '123456',
    })

    expect(userOrg.id).toEqual(expect.any(String))
  })

  it('should hash user org password upon registration', async () => {
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const registerUseCase = new RegisterUseCase(userOrgRepository)

    const { userOrg } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      whatsapp: '85986254012',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      userOrg.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const userOrgRepository = new InMemoryUsersOrgsRepository()
    const registerUseCase = new RegisterUseCase(userOrgRepository)

    const email = 'johndoe@exemple.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      whatsapp: '85986254012',
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        whatsapp: '85986254012',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserOrgAlreadyExistsError)
  })
})
