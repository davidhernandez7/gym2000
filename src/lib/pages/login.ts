// lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Función para verificar la contraseña hasheada
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Función para generar un token JWT
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
