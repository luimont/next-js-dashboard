// Si el componente se llama "loading.tsx", entonces se mostrará cuando la ruta en dashboard (en este caso) se encuentre cargando. 
// Podemos tener un loading diferente para cada ruta

import DashboardSkeleton from "../ui/skeletons";

export default function Loading(){
  return (
    <DashboardSkeleton />
  )
}