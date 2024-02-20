import { Prisma, UserOrg } from '@prisma/client'

export interface UsersOrgsResponsitory {
  findByEmail(email: string): Promise<UserOrg | null>
  create(data: Prisma.UserOrgCreateInput): Promise<UserOrg>
}
