import { z } from "zod"

export const listarBoletimValidation = z.object({
  numero: z.string().nullish(),
  data: z.string().nullish(),
  boletimTipo: z.number().nullish(),
  pagina: z.number({ message: "pagina" }),
  limite: z.number({ message: "limite" })
})

export type listarBoletimControllerProps = z.input<
  typeof listarBoletimValidation
>
export type listarBoletimServiceProps = z.output<typeof listarBoletimValidation>
