import { z } from "zod"
export const saveBoletimConteudoValidation = z.object({
  idBoletim: z.number({ message: "idBoletim" }),
  conteudo: z.array(
    z.object({
      conteudo_tipo_id: z.number({ message: "conteudo_tipo_id" }),
      items: z.array(
        z.object({
          id: z.number().optional().nullable(),
          identificador: z.number(),
          titulo: z.string(),
          url: z.string()
        })
      )
    })
  ),
  idusuario: z.number({ message: "id usuario" }),
  nomeusuario: z.string({ message: "nome usuario" })
})

export type saveBoletimConteudoControllerProps = z.input<
  typeof saveBoletimConteudoValidation
>
export type saveBoletimConteudoServiceProps = z.output<
  typeof saveBoletimConteudoValidation
>
