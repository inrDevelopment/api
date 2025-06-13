import { z } from "zod"
export const siteAuthValidation = z.object({
  login: z.string(),
  senha: z.string()
})

export type siteAuthControllerProps = z.input<typeof siteAuthValidation>

export type siteAuthServiceProps = z.output<typeof siteAuthValidation>
