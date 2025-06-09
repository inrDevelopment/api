import { z } from "zod"

export const excluirItemBoletimValidation = z.object({
  id: z.number()
})

export type excluirItemBoletimControllerProps = z.input<
  typeof excluirItemBoletimValidation
>
export type excluirItemBoletimServiceProps = z.output<
  typeof excluirItemBoletimValidation
>
