'use client'
import { OrderSchema } from "@/src/schema"
import { useStore } from "@/src/store"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"
import { toast } from "react-toastify"
import ProductDetails from "./ProductDetails"
import { createOrder } from "@/actions/create-order-action"

export default function OrderSummary() {
  const { order, clearOrder } = useStore()
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(error => 
        toast.error(error.message)
      )
      return
    } 

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(error => 
        toast.error(error.message)
      )
      return
    } 
    
    toast.success('Pedido realizado correctamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-auto md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      {order.length === 0
        ? <p className="text-center my-10">El carrito esta vacio</p>
        : <div className="mt-5">
          {order.map(item => <ProductDetails key={item.id} item={item} />)}
          <p className="text-2xl text-center bg-white p-3 border-t-2 border-dashed shadow">Total: {''}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form className="w-full shadow" action={handleCreateOrder}>
            <input type="text" className="p-4 bg-white w-full border-t-2 border-dashed text-center outline-none focus:bg-neutral-100 font-bold text-lg transition-colors" placeholder="Tu nombre" name="name" />
            <input type="submit" className="py-4 text-white bg-green-600 w-full text-center cursor-pointer hover:bg-green-700 transition-all font-bold" value='Confirmar pedido' />
          </form>
        </div>
      }
    </aside>
  )
}
