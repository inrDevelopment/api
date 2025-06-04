import { z } from "zod"

export const registerValidation = z.object({
  uuid: z.string({ message: "uuid é obrigatório" }).min(3),
  token: z.string({ message: "token é obrigatório" }).min(3)
})

export type registerControllerProps = z.input<typeof registerValidation>
export type registerServiceProps = z.output<typeof registerValidation>
