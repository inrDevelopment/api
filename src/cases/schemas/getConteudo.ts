import { z } from "zod"
export const getConteudoValidation = z.object({
  idBoletim: z.number()
})

export type getConteudoControllerProps = z.input<typeof getConteudoValidation>
export type getConteudoServiceProps = z.output<typeof getConteudoValidation>
