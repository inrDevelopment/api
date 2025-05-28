import { z } from "zod"

export const editarBoletimValidation = z.object({
  id: z.number(),
  titulo: z.string().min(3).max(300).optional(),
  data: z
    .string({ message: "Data do Boletim é obrigatório." })
    .transform(data => new Date(data)),
  idusuario: z.number()
})

export type editarBoletimControllerProps = z.input<
  typeof editarBoletimValidation
>
export type editarBoletimServiceProps = z.output<typeof editarBoletimValidation>
