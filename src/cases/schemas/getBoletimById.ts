import { z } from "zod"
export const getBoletimByIdValidation = z.object({
  idBoletim: z.number({ message: "id required" })
})

export type getBoletimByIdControllerProps = z.input<
  typeof getBoletimByIdValidation
>
export type getBoletimByIdServiceProps = z.output<
  typeof getBoletimByIdValidation
>
