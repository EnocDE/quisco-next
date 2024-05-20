"use client"

import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {
  const params = useParams() as {category: string}
  const currentCategory = useMemo(() => params.category === category.slug, [params])
  
  return (
    <div className={`${currentCategory ? 'bg-amber-400' : null} flex items-center gap-4 w-full border-t border-gray-300 p-3 last-of-type:border-b`}>
      <div className='w-16 h-16 relative'>
        <Image 
          src={`/icon_${category.slug}.svg`} 
          alt='Imagen categoria' 
          height={100}
          width={100}
        />
      </div>

      <Link className='text-xl font-bold' href={`/order/${category.slug}`}>{category.name}</Link>
    </div>
  )
}
