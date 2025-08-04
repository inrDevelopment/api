import { z } from "zod"

export const publicarValidation = z.object({
  idBoletim: z.number({ message: "id do boletim é obrigatório." }),
  idUsuario: z.number({ message: "id do usuário é obrigatório." }),
  nomeUsuario: z.string({ message: "nome do usuário é obrigatório." })
})

export type publicarControllerProps = z.input<typeof publicarValidation>
export type publicarServiceProps = z.output<typeof publicarValidation>
