// pages/api/ventas.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../prisma';

interface ProductoVenta {
  id: number;
  cantidad: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productos, total }: { productos: ProductoVenta[]; total: number } = req.body;

    try {
      const nuevaVenta = await prisma.venta.create({
        data: {
          total,
          productos: {
            create: productos.map((producto) => ({
              productoId: producto.id,
              cantidad: producto.cantidad,
            })),
          },
        },
        include: {
          productos: true, // Incluir productos vendidos en la respuesta
        },
      });

      return res.status(201).json(nuevaVenta);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la venta' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' }); // In case the method is not POST
}
