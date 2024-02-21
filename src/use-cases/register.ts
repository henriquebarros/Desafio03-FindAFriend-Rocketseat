import { UsersOrgsResponsitory } from '@/repositories/users-ongs-repository'
import { hash } from 'bcryptjs'
import { UserOrgAlreadyExistsError } from './errors/user-org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersOngsRepository: UsersOrgsResponsitory) {}

  async execute({ name, email, whatsapp, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const orgsWithSameEmail = await this.usersOngsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new UserOrgAlreadyExistsError()
    }

    await this.usersOngsRepository.create({
      name,
      email,
      whatsapp,
      password_hash,
    })
  }
}
