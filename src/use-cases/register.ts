import { UsersOrgsResponsitory } from '@/repositories/users-ongs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersOngsRepository: UsersOrgsResponsitory) {}

  async execute({ name, email, whatsapp, password }: RegisterUseCaseRequest) {
    const orgsWithSameEmail = await this.usersOngsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    const password_hash = await hash(password, 6)

    await this.usersOngsRepository.create({
      name,
      email,
      whatsapp,
      password_hash,
    })
  }
}
