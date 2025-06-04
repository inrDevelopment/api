import { z } from "zod"

export const listarBoletimPublicoValidation = z.object({
  numero: z.string().nullish(),
  boletim_tipo_id: z.number({ message: "Tipo do boletim é necessário." }),
  data: z.string().nullish(),
  limite: z.number({ message: "limite" }),
  pagina: z.number({ message: "pagina" })
})

export type listarBoletimPublicoControllerProps = z.input<
  typeof listarBoletimPublicoValidation
>
export type listarBoletimPublicoServiceProps = z.output<
  typeof listarBoletimPublicoValidation
>
