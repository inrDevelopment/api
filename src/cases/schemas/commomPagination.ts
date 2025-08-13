import { z } from "zod"
export const commomPaginationValidation = z.object({
  page: z.number({
    message: "O parametro page é obrigatório e deve ser um número."
  }),
  limit: z.number({
    message: "O parametro limit é obrigatório e deve ser um número."
  })
})

export type commomPaginationControllerProps = z.input<
  typeof commomPaginationValidation
>
export type commomPaginationServiceProps = z.output<
  typeof commomPaginationValidation
>
