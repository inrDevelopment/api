import { z } from "zod"
export const recuperacaoMailValidation = z.object({
  email: z.string()
})

export type recuperacaoMailControllerProps = z.input<
  typeof recuperacaoMailValidation
>
export type recuperacaoMailServiceProps = z.output<
  typeof recuperacaoMailValidation
>
