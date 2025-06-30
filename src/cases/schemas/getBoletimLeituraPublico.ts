import { z } from "zod"
export const getBoletimLeituraPublicoValidation = z.object({
  id: z.number()
})

export type getBoletimLeituraPublicoControllerProps = z.input<
  typeof getBoletimLeituraPublicoValidation
>
export type getBoletimLeituraPublicoServiceProps = z.output<
  typeof getBoletimLeituraPublicoValidation
>
