import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Params {
  params: { id: string }
}

export async function GET(req: Request, { params }: Params) {
  const venta = await prisma.venta.findUnique({
    where: { id: Number(params.id) },
    include: { productos: true }
  });
  if (!venta) return NextResponse.json({ error: 'Venta no encontrada' }, { status: 404 });
  return NextResponse.json(venta);
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const venta = await prisma.venta.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(venta);
}

export async function DELETE(req: Request, { params }: Params) {
  await prisma.venta.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: 'Venta eliminada' });
}
