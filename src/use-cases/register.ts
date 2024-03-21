import { UsersOrgsResponsitory } from '@/repositories/users-ongs-repository'
import { hash } from 'bcryptjs'
import { UserOrgAlreadyExistsError } from './errors/user-org-already-exists-error'
import { UserOrg } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
}

interface RegisterUseCaseResponse {
  userOrg: UserOrg
}

export class RegisterUseCase {
  constructor(private usersOrgsRepository: UsersOrgsResponsitory) {}

  async execute({
    name,
    email,
    whatsapp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgsWithSameEmail = await this.usersOrgsRepository.findByEmail(email)
    console.log(orgsWithSameEmail)

    if (orgsWithSameEmail) {
      throw new UserOrgAlreadyExistsError()
    }
    const userOrg = await this.usersOrgsRepository.create({
      name,
      email,
      whatsapp,
      password_hash,
    })

    return {
      userOrg,
    }
  }
}
