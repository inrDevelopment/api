import { z } from "zod"
export const commomDeleteValidation = z.object({
  id: z.number(),
  idusuario: z.number()
})

export type commomDeleteControllerProps = z.input<typeof commomDeleteValidation>
export type commomDeleteServiceProps = z.output<typeof commomDeleteValidation>
