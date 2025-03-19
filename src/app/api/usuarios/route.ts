import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/usuarios -> Lista de usuarios
export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

// POST /api/usuarios -> Crear usuario
export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, email, password } = body;

  const usuario = await prisma.usuario.create({
    data: { nombre, email, password },
  });

  return NextResponse.json(usuario);
}
