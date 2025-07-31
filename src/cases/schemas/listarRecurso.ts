import { z } from "zod"
export const listarRecursoValidation = z.object({
  recurso_tipo_id: z.number({ message: "recurso" }),
  search: z
    .string({ message: "search" })
    .max(150, { message: "Nome deve ter ao máximo 150 caracteres" }),
  ativo: z.boolean({ message: "ativo" }),
  limite: z.number({ message: "limite" }),
  pagina: z.number({ message: "pagina" })
})

export type listarRecursoControllerProps = z.input<
  typeof listarRecursoValidation
>
export type listarRecursoServiceProps = z.output<typeof listarRecursoValidation>
