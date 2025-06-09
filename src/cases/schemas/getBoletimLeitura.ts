import { z } from "zod"
export const getBoletimLeituraValidation = z.object({
  id: z.number()
})

export type getBoletimLeituraControllerProps = z.input<
  typeof getBoletimLeituraValidation
>
export type getBoletimLeituraServiceProps = z.output<
  typeof getBoletimLeituraValidation
>
