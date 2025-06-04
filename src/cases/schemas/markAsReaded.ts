import { z } from "zod"

export const markAsReadedValidation = z.object({
  idboletim: z.number(),
  idusuario: z.number()
})

export type markAsReadedControllerProps = z.input<typeof markAsReadedValidation>
export type markAsReadedServiceProps = z.output<typeof markAsReadedValidation>
