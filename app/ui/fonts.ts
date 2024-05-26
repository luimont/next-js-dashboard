// Por defecto en NextJS tenemos disponibles todas las fuentes que querramos de Google Fonts

import { Montserrat, Lusitana } from 'next/font/google' 

export const montserrat = Montserrat({ subsets: ['latin'] })

export const lusitana = Lusitana({ subsets: ['latin'], weight: '400' })