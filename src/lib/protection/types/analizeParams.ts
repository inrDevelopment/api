import { Request, Response } from "express"
import { analizeConfiguracao } from "./analizeConfiguracao"

export type analizeParams = {
  handle: (
    req: Request,
    res: Response<{ success: boolean; data?: any; message?: string }>
  ) => Promise<void>
  configuracao: analizeConfiguracao
}
