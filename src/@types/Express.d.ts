import { usuario } from "../lib/protection/types"

declare global {
  namespace Express {
    export interface Request {
      meta: {
        date: Date
        method: string
        start: number
        finish?: number
      }
      credenciais: usuario
    }
  }
}
