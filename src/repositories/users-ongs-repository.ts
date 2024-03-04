import { Prisma, UserOrg } from '@prisma/client'

export interface UsersOrgsResponsitory {
  findById(id: string): Promise<UserOrg | null>
  findByEmail(email: string): Promise<UserOrg | null>
  create(data: Prisma.UserOrgCreateInput): Promise<UserOrg>
}
