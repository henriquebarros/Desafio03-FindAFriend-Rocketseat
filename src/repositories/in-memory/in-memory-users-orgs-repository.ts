import { Prisma, UserOrg } from '@prisma/client'
import { UsersOrgsResponsitory } from '../users-orgs-repository'

export class InMemoryUsersOrgsRepository implements UsersOrgsResponsitory {
  public items: UserOrg[] = []
  async findById(id: string) {
    const userOrg = this.items.find((item) => item.id === id)
    if (!userOrg) {
      return null
    }

    return userOrg
  }

  async findByEmail(email: string) {
    const userOrg = this.items.find((item) => item.email === email)
    if (!userOrg) {
      return null
    }

    return userOrg
  }

  async create(data: Prisma.UserOrgCreateInput) {
    const userOrg = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(userOrg)

    return userOrg
  }
}
