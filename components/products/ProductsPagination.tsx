import Link from "next/link";

type ProductPaginationProps = {
  page: number,
  totalPages: number
}

export default function ProductsPagination({ page, totalPages }: ProductPaginationProps) {
  const showNextPageButton = (page + 1) <= totalPages;
  const showPreviousButton = (page - 1) > 0;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  return (
    <nav className="flex justify-center items-center mt-6">
      {showPreviousButton &&
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          type="button"
        >
          &laquo;
        </Link>
      }

      {pages.map(currentPage =>
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage === page ? ' font-bold' : ''}`}
        >
          {currentPage}
        </Link>
      )}

      {showNextPageButton &&
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          type="button"
        >
          &raquo;
        </Link>
      }
    </nav>
  )
}
