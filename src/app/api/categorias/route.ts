import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/categorias -> Listar categorías
export async function GET() {
  const categorias = await prisma.categoria.findMany();
  return NextResponse.json(categorias);
}

// POST /api/categorias -> Crear categoría
export async function POST(req: Request) {
  const body = await req.json();
  const nuevaCategoria = await prisma.categoria.create({
    data: body,
  });
  return NextResponse.json(nuevaCategoria);
}
