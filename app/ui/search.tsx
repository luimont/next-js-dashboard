'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWENN_CHANGES = 600;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback(
    // recibe como primer argunmento la busqueda original
    (term: string) => {
      //console.log(searchParams.get('query')) // Para tomar los queryParams de la URL
      const params = new URLSearchParams(searchParams) // 
      if (term) {
        params.set('query', term)
      }
      else {
        params.delete('query')
      }
      params.set('page', '1') // 
      replace(`${pathName}?${params.toString()}`) // Para generar la url a partir del input
    }, 

    // como segundo argumento recibe el tiempo de debounce
    WAIT_BETWENN_CHANGES 
  )
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => handleSearch(event.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
