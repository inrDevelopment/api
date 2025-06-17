import { z } from "zod"
export const confirmaRecuperacaoValidation = z.object({
  token: z.string(),
  senha: z.string()
})

export type confirmaRecuperacaoControllerProps = z.input<
  typeof confirmaRecuperacaoValidation
>
export type confirmaRecuperacaoServiceProps = z.output<
  typeof confirmaRecuperacaoValidation
>
