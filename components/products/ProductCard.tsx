import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image)
  return (
    <div className="border bg-white overflow-hidden h-full flex flex-col">
      <Image
        className="mx-auto"
        src={imagePath}
        alt={`Imagen platillo ${product.name}`}
        width={400}
        height={500}
        quality={75}
      />

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold flex-1">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
        <AddProductButton product={product} />
      </div>

    </div>
  )
}
