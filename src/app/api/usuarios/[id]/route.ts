import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Params {
  params: { id: string }
}

// GET /api/usuarios/:id
export async function GET(req: Request, { params }: Params) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(params.id) },
  });

  if (!usuario) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  return NextResponse.json(usuario);
}

// PUT /api/usuarios/:id -> Actualizar usuario
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const usuario = await prisma.usuario.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(usuario);
}

// DELETE /api/usuarios/:id -> Borrar usuario
export async function DELETE(req: Request, { params }: Params) {
  await prisma.usuario.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'Usuario eliminado' });
}
