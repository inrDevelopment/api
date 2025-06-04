import { z } from "zod"
export const listarRecursoValidation = z.object({
  recurso_tipo_id: z.number(),
  nome: z
    .string()
    .max(150, { message: "Nome deve ter ao máximo 150 caracteres" }),
  tag: z.string().length(5),
  icone: z
    .string()
    .max(30, { message: "Icone deve ter ao máximo 30 caracteres" }),
  url: z
    .string()
    .max(200, { message: "Url deve ter ao máximo 200 caracteres" }),
  ativo: z.boolean(),
  limite: z.number(),
  pagina: z.number()
})

export type listarRecursoControllerProps = z.input<
  typeof listarRecursoValidation
>
export type listarRecursoServiceProps = z.output<typeof listarRecursoValidation>
