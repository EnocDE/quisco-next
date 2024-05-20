"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

export default function ProductSearch() {

  const handleSearchForm = (formdata: FormData) => {
    const data = {
      search: formdata.get("search")
    }
    const result = SearchSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }

    redirect(`/admin/products/search?search=${result.data.search}`)
  }

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar producto"
        name="search"
        className="p-3 placeholder-gray-400 w-full"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-3 text-white font-bold"
      />
    </form>
  )
}
