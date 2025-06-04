import { z } from "zod"

export const markAsUnreadedValidation = z.object({
  idboletim: z.number(),
  idusuario: z.number()
})

export type markAsUnreadedControllerProps = z.input<
  typeof markAsUnreadedValidation
>
export type markAsUnreadedServiceProps = z.output<
  typeof markAsUnreadedValidation
>
