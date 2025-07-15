import { z } from "zod"
export const salvarRecursoValidation = z.object({
  id: z.number({ message: "id" }).optional(),
  recurso_tipo_id: z.number({ message: "recurso_tipo_id" }),
  nome: z
    .string({ message: "nome" })
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
    .max(150, { message: "Nome deve ter ao máximo 150 caracteres" }),
  tag: z.string().max(50),
  icone: z
    .string({ message: "icone" })
    .min(2, { message: "Icone deve ter no mínimo 2 caracteres" })
    .max(30, { message: "Icone deve ter ao máximo 30 caracteres" }),
  url: z
    .string({ message: "url" })
    .min(2, { message: "Url deve ter no mínimo 2 caracteres" })
    .max(200, { message: "Url deve ter ao máximo 200 caracteres" }),
  ativo: z.boolean({ message: "ativo" }),
  idusuario: z.number({ message: "idusuario id" })
})

export type salvarRecursoControllerProps = z.input<
  typeof salvarRecursoValidation
>
export type salvarRecursoServiceProps = z.output<typeof salvarRecursoValidation>
