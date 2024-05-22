import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: {
      orderReadyAt: 'desc'
    },
    where: {
      orderReadyAt: {
        not: null
      }
    },
    take: 6,
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json(orders)
}