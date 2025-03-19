// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Para evitar múltiples instancias en desarrollo (Next.js reinicia mucho)
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
