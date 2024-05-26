'use server'

// 'use server' <- Marcar que todas las funciones que se exportan en este archivo son de 
// servidor y por lo tanto no se ejecuta ni se envian al cliente

import { Invoice } from './definitions'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})

const CreateInvoiceFromSchema = CreateInvoiceSchema.omit({
  // Le estamos indicando que omita estos del esquema, ya que la web no los está agregando por el momento
  id: true,
  date: true
})

export async function createInvoice(formData: FormData) {
  console.log('createInvoice', formData)
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   description: formData.get('description'),
  // }

  // const rawFormData = Object.fromEntries(formData.entries()) // Convierte los datos del formulario en un objeto

  const { customerId, amount, status } = CreateInvoiceFromSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100 // Transformamos para evitar errores de redondeo
  
  // Obtenemos la fecha actual y con split solo nos quedamos con el dia (no necesitamos la hora)
  
  // const date = new Date().toISOString().split('T')[0] // Alternativa 1 
  // const [date, time] = new Date().toISOString().split('T') // Alternativa 2 (Si es que necesitamos el time tambien)
  const [date] = new Date().toISOString().split('T') // Alternativa 3

  console.log('createInvoice', {
    customerId,
    amountInCents,
    status,
    date
  })

  await sql `
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  ` // esto es seguro ya que internamente vercel hace una traduccion impidiendo inyeccion sql

  // Despues del INSERT podemos decirle que haga una revalidacion para que se muestren los nuevos datos y no los de caché
  // Le indicamos que esta ruta tiene nuevos datos y por ende tiene que volver a traerlos
  revalidatePath('/dashboard/invoices')

  // Luego del insert nos movemos a la ruta de invoices para que no quede en el form de createInvoice
  redirect('/dashboard/invoices')
 
}



