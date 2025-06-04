import { z } from "zod"

export const listarBoletimPrivadoValidation = z.object({
  numero: z.string().nullish(),
  boletim_tipo_id: z.number({ message: "Tipo do boletim é necessário." }),
  data: z.string().nullish(),
  idusuario: z.number({ message: "idusuario" }),
  limite: z.number({ message: "limite" }),
  pagina: z.number({ message: "pagina" })
})

export type listarBoletimPrivadoControllerProps = z.input<
  typeof listarBoletimPrivadoValidation
>
export type listarBoletimPrivadoServiceProps = z.output<
  typeof listarBoletimPrivadoValidation
>
