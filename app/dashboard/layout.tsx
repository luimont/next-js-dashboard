// Este layout al estar dentro de la ruta "dashboard" será el layout de cada uno de los componentes que estan dentro de esta ruta
// y por ende será utilizado sin renderizarse cuando se cambie entre estas páginas

import SideNav from "../ui/dashboard/sidenav";

export default function Layout (
  { children }: { children: React.ReactNode }
) {
	return (
		<section className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* <p> Esto es el layout del dashboard: </p> */}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
			  {children}
      </div>
		</section>
  )
}
