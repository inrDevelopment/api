import { z } from "zod"

export const favoriteThisValidation = z.object({
  idboletim: z.number(),
  idusuario: z.number()
})

export type favoriteThisControllerProps = z.input<typeof favoriteThisValidation>
export type favoriteThisServiceProps = z.output<typeof favoriteThisValidation>
