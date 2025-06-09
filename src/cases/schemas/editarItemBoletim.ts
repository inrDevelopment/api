import { z } from "zod"

export const editarItemBoletimValidation = z.object({
  id: z.number(),
  conteudoTipoId: z.number(),
  boletimId: z.number(),
  identificador: z.number(),
  ordem: z.number()
})

export type editarItemBoletimControllerProps = z.input<
  typeof editarItemBoletimValidation
>
export type editarItemBoletimServiceProps = z.output<
  typeof editarItemBoletimValidation
>
