'use client' // LA funcion "usePathname()" solo existe en el cliente, por lo cual hay que utilizar 'use client', ya que por defecto intentará ejecutarlo en el servidor y dará error

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname() // Leer la ruta de dónde se encuentra actualmente. 
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // 
          //  En lugar de utilizar el anchor -> <a></a> que sirve para ir de una pagina a otra,
          //  Utilizamos el componente link -> <Link></Link> de NextJS para que nos permita hacer redirecciones sin recargar la pagina.
          //
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex h-[48px] grow items-center justify-center gap-2 rounded-md 
              bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
