"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function EditProductForm({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const id = +params.id!

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    }

    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      return result.error.issues.forEach((issue) => toast.error(issue.message))
    }

    const response = await updateProduct(result.data, id)
    if (response?.errors) {
      return response.errors.forEach((issue) => toast.error(issue.message))
    }

    setTimeout(() => {
      toast.success("Producto actualizado correctamente")
    }, 1000)
    router.push("/admin/products")
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        className="space-y-5"
        action={handleSubmit}
      >
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 font-bold cursor-pointer transition-colors text-xl"
          value={'Guardar cambios'}
        />
      </form>
    </div>
  )
}
