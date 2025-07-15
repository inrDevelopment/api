import { z } from "zod"
export const criarRecursoValidation = z.object({
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

export type criarRecursoControllerProps = z.input<typeof criarRecursoValidation>
export type criarRecursoServiceProps = z.output<typeof criarRecursoValidation>
