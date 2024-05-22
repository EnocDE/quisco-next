import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { completeOrder } from "@/actions/complete-order-action";

type OrderCardProps = {
  order: OrderWithProducts
}

export default async function OrderCard({ order }: OrderCardProps) {
  
  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4 flex flex-col border border-neutral-200 min-h-[450px]"
    >
      <p className='text-2xl font-medium '>Cliente: {order.name}</p>
      <p className='text-lg font-medium '>Productos ordenados: </p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map(product => (
          <div key={product.producId} className="flex items-center gap-2 border-t border-gray-200 pt-4">
            <dt className="flex items-center text-sm">
              <span className="font-black">({product.quantity}{''})</span>
            </dt>
            <dd>{product.product.name}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-bold ">Total a Pagar:</dt>
          <dd className="text-base font-bold ">{formatCurrency(order.total)}</dd>
        </div>
      </dl>

      <form action={completeOrder} className="flex-1 flex flex-col justify-end">
        <input type="hidden" value={order.id} name="order_id" />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value='Marcar Orden Completada'
        />
      </form>
    </section>
  )
}