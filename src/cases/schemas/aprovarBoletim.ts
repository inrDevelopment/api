import { z } from "zod"

export const aprovarValidation = z.object({
  idBoletim: z.number({ message: "id do boletim é obrigatório." }),
  idUsuario: z.number({ message: "id do usuário é obrigatório." }),
  nomeUsuario: z.string({ message: "nome do usuário é obrigatório." })
})

export type aprovarControllerProps = z.input<typeof aprovarValidation>
export type aprovarServiceProps = z.output<typeof aprovarValidation>
