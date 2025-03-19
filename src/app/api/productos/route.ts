import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const productos = await prisma.producto.findMany({
    include: { categoria: true }
  });
  return NextResponse.json(productos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const producto = await prisma.producto.create({
    data: body,
  });
  return NextResponse.json(producto);
}
