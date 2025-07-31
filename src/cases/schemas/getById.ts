import { z } from "zod"
export const getTipoConteudoValidation = z.object({
  idtipoboletim: z.number()
})

export type getTipoConteudoControllerProps = z.input<
  typeof getTipoConteudoValidation
>
export type getTipoConteudoServiceProps = z.output<
  typeof getTipoConteudoValidation
>
