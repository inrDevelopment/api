import { z } from "zod"
export const getBoletimLeituraPrivadoValidation = z.object({
  id: z.number({ message: "id required" }),
  idusuario: z.number({ message: "idusuario required" })
})

export type getBoletimLeituraPrivadoControllerProps = z.input<
  typeof getBoletimLeituraPrivadoValidation
>
export type getBoletimLeituraPrivadoServiceProps = z.output<
  typeof getBoletimLeituraPrivadoValidation
>
