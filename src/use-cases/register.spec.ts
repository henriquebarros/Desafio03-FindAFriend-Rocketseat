import { describe, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should hash user org password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        }
      },
    })

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      whatsapp: '85986254012',
      password: '123456',
    })
  })
})
