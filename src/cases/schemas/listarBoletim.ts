import { z } from "zod"

export const listarBoletimValidation = z.object({
  titulo: z.string(),
  boletim_tipo_id: z.number({ message: "Tipo do boletim é necessário." }),
  data: z.date({ message: "Data do Boletim é obrigatório." }),
  limite: z.number(),
  pagina: z.number()
})

export type listarBoletimControllerProps = z.input<
  typeof listarBoletimValidation
>
export type listarBoletimServiceProps = z.output<typeof listarBoletimValidation>
