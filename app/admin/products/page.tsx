import ProductSearch from "@/components/products/ProductSearch";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation"

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  return await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
}

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
  const page = +searchParams.page || 1
  const pageSize = 10

  if (page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg justify-between">
        <Link href={'/admin/products/new'} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 font-bold text-center">Crear producto</Link>
        <ProductSearch />
      </div>

      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  )
}
