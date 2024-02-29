import { UsersOrgsResponsitory } from '@/repositories/users-ongs-repository'
import { UserOrg } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  userOrg: UserOrg
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersOrgsResponsitory) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const userOrg = await this.userRepository.findByEmail(email)

    if (!userOrg) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, userOrg.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      userOrg,
    }
  }
}
