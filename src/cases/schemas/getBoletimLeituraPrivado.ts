import { z } from "zod"
export const getBoletimLeituraPrivadoValidation = z.object({
  id: z.number(),
  idusuario: z.number()
})

export type getBoletimLeituraPrivadoControllerProps = z.input<
  typeof getBoletimLeituraPrivadoValidation
>
export type getBoletimLeituraPrivadoServiceProps = z.output<
  typeof getBoletimLeituraPrivadoValidation
>
