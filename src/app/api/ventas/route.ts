import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductoVentaBody {
  productoId: number;
  cantidad: number;
}

interface VentaRequestBody {
  total: number;
  productos: ProductoVentaBody[];
}

export async function GET() {
  const ventas = await prisma.venta.findMany({
    include: {
      productos: {
        include: {
          producto: true,
        },
      },
    },
  });
  return NextResponse.json(ventas);
}

export async function POST(req: Request) {
  const body: VentaRequestBody = await req.json();

  const venta = await prisma.venta.create({
    data: {
      total: body.total,
      productos: {
        create: body.productos.map((p) => ({
          cantidad: p.cantidad,
          productoId: p.productoId,
        })),
      },
    },
  });

  return NextResponse.json(venta);
}
