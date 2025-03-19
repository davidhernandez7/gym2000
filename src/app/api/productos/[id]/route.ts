import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Params {
  params: { id: string }
}

export async function GET(req: Request, { params }: Params) {
  const producto = await prisma.producto.findUnique({
    where: { id: Number(params.id) },
    include: { categoria: true }
  });
  if (!producto) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  return NextResponse.json(producto);
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const producto = await prisma.producto.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(producto);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.producto.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: 'Producto eliminado' });
}
