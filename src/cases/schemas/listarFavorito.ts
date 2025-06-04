import { z } from "zod"

export const listarFavoritoValidation = z.object({
  titulo: z.string(),
  boletim_tipo_id: z.number({ message: "Tipo do boletim é necessário." }),
  data: z.date({ message: "Data do Boletim é obrigatório." }),
  limite: z.number(),
  pagina: z.number()
})

export type listarFavoritoControllerProps = z.input<
  typeof listarFavoritoValidation
>
export type listarFavoritoServiceProps = z.output<
  typeof listarFavoritoValidation
>
