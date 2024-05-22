"use client"
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter()
  return (
    <div className="flex justify-end">
      <button
        onClick={() => router.back()}
        className="bg-amber-400 w-full shadow-md lg:w-auto text-xl px-10 py-3 font-bold text-center"
      >
        Volver
      </button>
    </div>
  )
}
