import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/productoVenta -> Listar todas las relaciones producto-venta
export async function GET() {
  const relaciones = await prisma.productoVenta.findMany({
    include: {
      producto: true,
      venta: true
    }
  });
  return NextResponse.json(relaciones);
}

// POST /api/productoVenta -> Crear una nueva relación producto-venta
export async function POST(req: Request) {
  const body = await req.json();
  const { cantidad, productoId, ventaId } = body;

  const nuevaRelacion = await prisma.productoVenta.create({
    data: { cantidad, productoId, ventaId },
  });

  return NextResponse.json(nuevaRelacion);
}
