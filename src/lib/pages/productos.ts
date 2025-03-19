// pages/api/productos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const productos = await prisma.producto.findMany({
        include: {
          categoria: true, // Incluimos la categoría del producto
        },
      });
      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  // Otro tipo de peticiones (POST, PUT, DELETE) se manejarían aquí si fuera necesario
}

