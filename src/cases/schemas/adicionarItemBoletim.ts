import { z } from "zod"
export const adicionarItemBoletimValidation = z.object({
  idBoletim: z.number({
    message: "O parametro idBoletim é obrigatório e deve ser um número."
  }),
  boletim_conteudo_tipo_id: z.number({
    message: "Tipo de conteúdo do boletim é necessário."
  }),
  id: z.number({
    message: "O identificador do item é obrigatório."
  })
})

export type adicionarItemBoletimControllerProps = z.input<
  typeof adicionarItemBoletimValidation
>
export type adicionarItemBoletimServiceProps = z.output<
  typeof adicionarItemBoletimValidation
>
