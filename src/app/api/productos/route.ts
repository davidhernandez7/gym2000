import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProductoRequestBody {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId: number;
}

export async function GET() {
  const productos = await prisma.producto.findMany({
    include: { categoria: true },
  });
  return NextResponse.json(productos);
}

export async function POST(req: Request) {
  const body: ProductoRequestBody = await req.json();

  const producto = await prisma.producto.create({
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: body.precio,
      stock: body.stock,
      categoriaId: body.categoriaId,
    },
  });

  return NextResponse.json(producto);
}
