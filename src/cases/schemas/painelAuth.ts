import { z } from "zod"
export const painelAuthValidation = z.object({
  login: z.string({ message: "login" }),
  senha: z.string({ message: "senha" }),
  keep: z.boolean({ message: "keep" })
})

export type painelAuthControllerProps = z.input<typeof painelAuthValidation>
export type painelAuthServiceProps = z.output<typeof painelAuthValidation>
