import { z } from "zod"
export const boletimSelecionarValidation = z.object({
  id: z.number({
    message: "O parametro id é obrigatório e deve ser um número."
  })
})

export type boletimSelecionarControllerProps = z.input<
  typeof boletimSelecionarValidation
>
export type boletimSelecionarServiceProps = z.output<
  typeof boletimSelecionarValidation
>
