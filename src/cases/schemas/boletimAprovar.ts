import { z } from "zod"
export const boletimAprovarValidation = z.object({
  idBoletim: z.number({
    message: "O parametro idBoletim é obrigatório e deve ser um número."
  }),
  idusuario: z.number({
    message: "O parametro idusuario é obrigatório e deve ser um número."
  })
})

export type boletimAprovarControllerProps = z.input<
  typeof boletimAprovarValidation
>
export type boletimAprovarServiceProps = z.output<
  typeof boletimAprovarValidation
>
