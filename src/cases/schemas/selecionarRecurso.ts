import { z } from "zod"
export const selecionarRecursoValidation = z.object({
  id: z.number()
})

export type selecionarRecursoControllerProps = z.input<
  typeof selecionarRecursoValidation
>
export type selecionarRecursoServiceProps = z.output<
  typeof selecionarRecursoValidation
>
