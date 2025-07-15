import { z } from "zod"

export const appAuthValidation = z.object({
  login: z.string({ message: "login é obrigatório" }).email().min(3),
  senha: z.string({ message: "senha é obrigatório" }).min(3).max(30),
  uuid: z.string({ message: "uuid é obrigatório" }).min(3)
})

export type appAuthControllerProps = z.input<typeof appAuthValidation>
export type appAuthServiceProps = z.output<typeof appAuthValidation>
