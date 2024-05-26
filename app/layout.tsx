import './ui/global.css' // Como queremos que los estilos globales queden en toda parte de la app, los importamos en este layout.tsx
import { montserrat } from './ui/fonts' // Aqui importamos nuestra fuente que definimos en fonts.ts

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Toda la app y Todas las rutas se envuelven con este layout (Dado que a veces es necesario que la web no se recargue) */
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        {/* <p> Este es el Layout principal: </p> */}
        {children}
        <footer className='py-10 flex justify-center items-center'>
          Mi Footer
        </footer>
      </body>
    </html>
  );
}
