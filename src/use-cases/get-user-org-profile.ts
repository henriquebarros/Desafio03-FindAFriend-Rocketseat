import { UsersOrgsResponsitory } from '@/repositories/users-ongs-repository'
import { UserOrg } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserOrgProfileUseCaseRequest {
  userOrgId: string
}

interface GetUserOrgProfileUseCaseResponse {
  userOrg: UserOrg
}

export class GetUserOrgProfileUseCase {
  constructor(private userRepository: UsersOrgsResponsitory) {}

  async execute({
    userOrgId,
  }: GetUserOrgProfileUseCaseRequest): Promise<GetUserOrgProfileUseCaseResponse> {
    const userOrg = await this.userRepository.findById(userOrgId)

    if (!userOrg) {
      throw new ResourceNotFoundError()
    }

    return {
      userOrg,
    }
  }
}
