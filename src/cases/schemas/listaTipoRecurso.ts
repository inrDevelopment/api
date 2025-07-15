import { z } from "zod"
export const listarTipoRecursoValidation = z.object({
  limite: z.number(),
  pagina: z.number()
})

export type listarTipoRecursoControllerProps = z.input<
  typeof listarTipoRecursoValidation
>
export type listarTipoRecursoServiceProps = z.output<
  typeof listarTipoRecursoValidation
>
