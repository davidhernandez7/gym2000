import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Params {
  params: { id: string }
}

// GET /api/productoVenta/:id -> Obtener una relación por ID
export async function GET(req: Request, { params }: Params) {
  const relacion = await prisma.productoVenta.findUnique({
    where: { id: Number(params.id) },
    include: { producto: true, venta: true }
  });

  if (!relacion) return NextResponse.json({ error: 'Relación no encontrada' }, { status: 404 });
  return NextResponse.json(relacion);
}

// PUT /api/productoVenta/:id -> Actualizar la cantidad u otra cosa
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const relacion = await prisma.productoVenta.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(relacion);
}

// DELETE /api/productoVenta/:id -> Eliminar la relación
export async function DELETE(req: Request, { params }: Params) {
  await prisma.productoVenta.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: 'Relación eliminada' });
}
