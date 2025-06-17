import { z } from "zod"
export const recuperacaoCelValidation = z.object({
  cell: z.string()
})

export type recuperacaoCelControllerProps = z.input<
  typeof recuperacaoCelValidation
>
export type recuperacaoCelServiceProps = z.output<
  typeof recuperacaoCelValidation
>
