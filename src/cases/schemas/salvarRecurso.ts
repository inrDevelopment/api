import { z } from "zod"
export const salvarRecursoValidation = z.object({
  id: z.number().optional(),
  recurso_tipo_id: z.number(),
  nome: z
    .string()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .max(150, { message: "Nome deve ter ao máximo 150 caracteres" }),
  tag: z.string().length(5),
  icone: z
    .string()
    .min(2, { message: "Icone deve ter no mínimo 2 caracteres" })
    .max(30, { message: "Icone deve ter ao máximo 30 caracteres" }),
  url: z
    .string()
    .min(2, { message: "Url deve ter no mínimo 2 caracteres" })
    .max(200, { message: "Url deve ter ao máximo 200 caracteres" }),
  ativo: z.boolean(),
  idusuario: z.number()
})

export type salvarRecursoControllerProps = z.input<
  typeof salvarRecursoValidation
>
export type salvarRecursoServiceProps = z.output<typeof salvarRecursoValidation>
