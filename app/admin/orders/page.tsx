import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic'

async function getPendingOrders() {
  return await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
}

export default async function OrdersPage() {
  const orders = await getPendingOrders()

  const handleRefresh = async () => {
    "use server"
    revalidatePath("/admin/orders")
  }

  return (
    <>
      <Heading>Administrar ordenes</Heading>

      <form action={handleRefresh}>
        <input
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-colors text-white w-full lg:w-auto text-xl px-10 py-3 font-bold text-center inline-block cursor-pointer mb-5"
          value={'Actualizar ordenes'}
        />
      </form>

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {orders.map(order =>
            <OrderCard key={order.id} order={order} />
          )}
        </div>
      )
        : <p className="text-center">No hay ordenes pendientes</p>
      }
    </>
  )
}
