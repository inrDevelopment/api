import { z } from "zod"

export const boletimNovoValidation = z.object({
  titulo: z.string().min(3).max(300).optional(),
  boletim_tipo_id: z.number({ message: "Tipo do boletim é necessário." }),
  data: z
    .string({ message: "Data do Boletim é obrigatório." })
    .transform(data => new Date(data)),
  idusuario: z.number()
})

export type boletimNovoControllerProps = z.input<typeof boletimNovoValidation>
export type boletimNovoServiceProps = z.output<typeof boletimNovoValidation>
