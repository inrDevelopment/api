import { z } from "zod"

export const listarFavoritoValidation = z.object({
  numero: z.string().nullable(),
  boletim_tipo_id: z.array(
    z.number({ message: "Tipo do boletim é necessário." }),
    { message: "Tipo de boletim deve ser uma array." }
  ),
  data: z.string().nullable(),
  idusuario: z.number({ message: "idusuario" }),
  limite: z.number({ message: "limite" }),
  pagina: z.number({ message: "pagina" })
})

export type listarFavoritoControllerProps = z.input<
  typeof listarFavoritoValidation
>
export type listarFavoritoServiceProps = z.output<
  typeof listarFavoritoValidation
>
