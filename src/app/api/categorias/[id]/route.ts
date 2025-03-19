import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
  const categoria = await prisma.categoria.findUnique({
    where: { id: Number(context.params.id) },
    include: { productos: true }
  });

  if (!categoria) {
    return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
  }

  return NextResponse.json(categoria);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const body = await req.json();
  const categoria = await prisma.categoria.update({
    where: { id: Number(context.params.id) },
    data: body,
  });
  return NextResponse.json(categoria);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  await prisma.categoria.delete({
    where: { id: Number(context.params.id) },
  });
  return NextResponse.json({ message: 'Categoría eliminada' });
}
