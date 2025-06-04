import { z } from "zod"
export const boletimPublicarValidation = z.object({
  idBoletim: z.number({
    message: "O parametro idBoletim é obrigatório e deve ser um número."
  }),
  idusuario: z.number({
    message: "O parametro idusuario é obrigatório e deve ser um número."
  })
})

export type boletimPublicarControllerProps = z.input<
  typeof boletimPublicarValidation
>
export type boletimPublicarServiceProps = z.output<
  typeof boletimPublicarValidation
>
