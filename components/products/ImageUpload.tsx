"use client"

import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useEffect, useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import { set } from "zod"

type ImageUploadProps = {
  image?: string
}

export default function ImageUpload({ image }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState('')
  useEffect(() => {
    if (image) {
      setImageUrl(image)
    }
  }, [])
  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close()
          // @ts-ignore
          setImageUrl(result.info?.secure_url)
        }
      }}
      uploadPreset="hd81fgit"
      options={{
        maxFiles: 1
      }}
    >
      {({ open, isLoading }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800">Imagen producto: </label>
            <div
              onClick={() => !isLoading && open()}
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <TbPhotoPlus
                size={50}
              />
              <p className="text-lg font-semibold">{imageUrl ? "" : "Agregar imagen"}</p>
              {imageUrl &&
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    className="object-contain"
                    src={getImagePath(imageUrl)}
                    alt="Imagen producto"
                    priority
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
              }
            </div>
          </div>
          <input type="hidden" name="image" value={imageUrl} />
        </>
      )
      }

    </CldUploadWidget>
  )
}
