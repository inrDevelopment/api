import { z } from "zod"
export const painelAuthValidation = z.object({
  login: z.string(),
  senha: z.string(),
  keep: z.boolean()
})

export type painelAuthControllerProps = z.input<typeof painelAuthValidation>
export type painelAuthServiceProps = z.output<typeof painelAuthValidation>
