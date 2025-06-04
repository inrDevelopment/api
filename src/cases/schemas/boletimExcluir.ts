import { z } from "zod"
export const boletimExcluirValidation = z.object({
  id: z.number({
    message: "O parametro id é obrigatório e deve ser um número."
  }),
  idusuario: z.number({
    message: "O parametro idusuario é obrigatório e deve ser um número."
  })
})

export type boletimExcluirControllerProps = z.input<
  typeof boletimExcluirValidation
>
export type boletimExcluirServiceProps = z.output<
  typeof boletimExcluirValidation
>
