import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.userOrg.create({
  data: {
    name: 'Pet Amigo',
    email: 'henriquebarros@live.com',
    whatsapp: '(85) 98888-8888',
    address: 'Av. J, 100, PQ, CE',
  },
})

export const app = fastify()
