import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      category: true
    }
  })
}

export type EditProduct = Awaited<ReturnType<typeof getProductById>>

export default async function EditProductsPage({ params }: { params: { id: string } }) {
  const product = await getProductById(+params.id)
  if (!product) {
    notFound()
  }
  return (
    <>
      <Heading>Editando producto <span className="text-indigo-600">{product.name}</span></Heading>

      <GoBackButton />
      
      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>
    </>
  )
}
