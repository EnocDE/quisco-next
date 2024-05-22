"use client"
import LatestOrderItem from "@/components/order/LatestOrderItem"
import Logo from "@/components/ui/Logo"
import Spinner from "@/components/ui/Spinner"
import { OrderWithProducts } from "@/src/types"
import useSWR from "swr"

export default function OrdersPage() {
  const url = "/orders/api"
  const fetcher = () => fetch(url).then(data => data.json())
  const { data, isLoading } = useSWR<OrderWithProducts[]>("/orders", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  return (
    <>
      {isLoading
        ? (
          <div className="h-screen w-screen flex justify-center items-center">
            <Spinner />
          </div>
        )
        : (
          <>
            <h1 className="text-center text-6xl mt-10 font-black">Ordenes listas</h1>
            <Logo />
            {data?.length
              ? (
                <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto my-10">
                  {data.map(order => 
                    <LatestOrderItem key={order.id} order={order} />
                  )}
                </div>
              )
              : <p className="text-center my-10">No hay ordenes listas</p>
            }
          </>
        )
      }
    </>
  )
}
