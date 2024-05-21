import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col min-h-[55vh]">
        <Heading>Producto no encontrado</Heading>
        <Link 
          href={'/admin/products'}
          className="bg-amber-400 px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto shadow-md"
        >Ir a productos</Link>
    </div>
  )
}
