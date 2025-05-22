import { z } from "zod"

export const loginLeitorValidation = z.object({
  login: z.string({ message: "uuid é obrigatório" }).email().min(3),
  senha: z.string({ message: "uuid é obrigatório" }).min(3).max(30),
  uuid: z.string({ message: "uuid é obrigatório" }).min(3)
})

export type loginLeitorControllerProps = z.input<typeof loginLeitorValidation>
export type loginLeitorServiceProps = z.output<typeof loginLeitorValidation>
