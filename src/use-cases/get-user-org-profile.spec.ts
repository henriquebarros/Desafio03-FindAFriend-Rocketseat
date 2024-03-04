import { InMemoryUsersOrgsRepository } from '@/repositories/in-memory/in-memory-users-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserOrgProfileUseCase } from './get-user-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userOrgRepository: InMemoryUsersOrgsRepository
let sut: GetUserOrgProfileUseCase

describe('Get UserOrg Profile Use Case', () => {
  beforeEach(() => {
    userOrgRepository = new InMemoryUsersOrgsRepository()
    sut = new GetUserOrgProfileUseCase(userOrgRepository)
  })

  it('should be able to get user profile', async () => {
    const createUserOrg = await userOrgRepository.create({
      name: 'Pet Muzzle Friend',
      email: 'petmuzzlefriend@exemple.com',
      whatsapp: '(85) 98888-4444',
      password_hash: await hash('123456', 6),
    })

    const { userOrg } = await sut.execute({
      userOrgId: createUserOrg.id,
    })

    expect(userOrg.id).toEqual(expect.any(String))
    expect(userOrg.name).toEqual('Pet Muzzle Friend')
  })
  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userOrgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
