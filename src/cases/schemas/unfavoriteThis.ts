import { z } from "zod"

export const unfavoriteThisValidation = z.object({
  idboletim: z.number(),
  idusuario: z.number()
})

export type unfavoriteThisControllerProps = z.input<
  typeof unfavoriteThisValidation
>
export type unfavoriteThisServiceProps = z.output<
  typeof unfavoriteThisValidation
>
