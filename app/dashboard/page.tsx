// Enrutado basado en el Sistema de Archivos (File-System-Routing), se accede localhost:3000/dashboard

import { Suspense } from "react";
import { fetchLatestInvoices, fetchRevenue, fetchCardData } from "../lib/data"
import { Card } from "../ui/dashboard/cards";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import RevenueChart from "../ui/dashboard/revenue-chart";
import { lusitana } from "../ui/fonts";
import { RevenueChartSkeleton } from "../ui/skeletons";

  /* 
  Normalmente un fetching de datos lo podriamos hacer con useEffect. 
  Pero el tema es que eso se ejecuta en el cliente, por lo cual no estariamos aprovechando el SSR.
    useEffect(() => {
      fetch() // 
    , []}) 
  
 
  En cambio si hacemos el fetching de datos en la parte del servidor, tratamos los datos desde el servidor ya que es mas rapido que lo haga el servidor y no el cliente.
  Entonces de esta manera, ya que el servidor tiene mejor conexion y potencia, se encarga de hacer el fetch y luego enviar el html ya procesado al cliente
 
    const rest = await fetch('https://api.example.com')
    const json = await rest.json()
    console.log(json)
  
  */

export default async function DashboardPage() { // Notar que el componente que se ejecuta en Servidor puede ser Async
  
  // OJO: El contenido de este componente no se mostrará hasta que terminen estos fetching

  //const revenue = await fetchRevenue() // Ej: 2 segundos // Esto se movió al componente para hacer "Fetching a nivel de componente"
  // console.log(revenue) // este console.log sólo se ve en el servidor

  const latestInvoices = await fetchLatestInvoices() // Ej: 1 segundo

  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData() // Ej: 3 segundos

  // Por lo tanto tardará por ejemplo 2+1+3 segundos en mostrar la pagina
  // Para evitar que espere todos los fetch, se puede hacer uso de "Suspense"

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 
          Suspense: Le indicamos que lo que envolvemos es Asyncrono y lo vamos a esperar
          Fallback: Mientras esperamos, se muestra lo que queremos
        */}
        <Suspense fallback={<RevenueChartSkeleton/>}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
