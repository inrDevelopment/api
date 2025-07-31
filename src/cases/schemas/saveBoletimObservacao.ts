import { z } from "zod"
export const salvarBoletimObservacaoValidation = z.object({
  idBoletim: z.number({ message: "idBoletim" }),
  observacao: z.string({ message: "observacao" }),
  idusuario: z.number({ message: "idusuario" }),
  nomeusuario: z.string({ message: "nomeusuario" })
})

export type salvarBoletimObservacaoControllerProps = z.input<
  typeof salvarBoletimObservacaoValidation
>
export type salvarBoletimObservacaoServiceProps = z.output<
  typeof salvarBoletimObservacaoValidation
>
