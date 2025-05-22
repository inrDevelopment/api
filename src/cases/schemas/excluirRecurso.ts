import { z } from "zod"
export const excluirRecursoValidation = z.object({
  id: z.number(),
  idusuario: z.number()
})

export type excluirRecursoControllerProps = z.input<
  typeof excluirRecursoValidation
>
export type excluirRecursoServiceProps = z.output<
  typeof excluirRecursoValidation
>
