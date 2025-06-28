import { meta } from "../lib/protection"
import { usuario } from "../lib/protection/types"

declare global {
  namespace Express {
    export interface Request {
      meta: meta
      usuario: usuario
    }
  }
}
