import { z } from "zod"

export const ultimoConteudoValidation = z.object({
  tipo_id: z.number()
})

export type ultimoConteudoControllerProps = z.input<
  typeof ultimoConteudoValidation
>
export type ultimoConteudoServiceProps = z.output<
  typeof ultimoConteudoValidation
>
