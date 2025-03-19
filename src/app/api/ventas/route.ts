import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const ventas = await prisma.venta.findMany({
    include: { productos: true }
  });
  return NextResponse.json(ventas);
}

export async function POST(req: Request) {
  const body = await req.json();
  const venta = await prisma.venta.create({
    data: {
      total: body.total,
      productos: {
        create: body.productos.map((p: any) => ({
          cantidad: p.cantidad,
          productoId: p.productoId
        }))
      }
    }
  });
  return NextResponse.json(venta);
}
