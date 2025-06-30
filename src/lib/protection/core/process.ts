//#region Imports
import { Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { Meta, params, Usuario } from ".."
import { defaultResponse } from "../../../cases/core/defaultResponse"
import application from "../../../config/application"
//#endregion Imports

export default function process(
  params: params
): (req: Request, res: Response<defaultResponse>) => Promise<void> {
  return async (
    req: Request,
    res: Response<defaultResponse>
  ): Promise<void> => {
    try {
      req.meta = new Meta({
        url: req.path.toLowerCase(),
        method: req.method.toLowerCase(),
        date: new Date(),
        start: new Date().getTime()
      })

      res.on("finish", () => {
        req.meta.finish()
        req.meta.log()
      })

      switch (params.configuracao.nivel) {
        case 0: {
          return await params.handle(req, res)
        }
        case 1: {
          if (!req.headers["credential"]) throw new Error("Não autorizado")

          const paramsConstructor: any = verify(
            req.headers["credential"].toString(),
            application.key
          )

          req.usuario = new Usuario(paramsConstructor)

          return await params.handle(req, res)
        }
        case 2: {
          if (!req.headers["credential"]) throw new Error("Não autorizado")

          const paramsConstructor: any = verify(
            req.headers["credential"].toString(),
            application.key
          )

          req.usuario = new Usuario(paramsConstructor)

          if (req.usuario.isSuper()) {
            return await params.handle(req, res)
          }

          if (
            !req.usuario.isAllowed({
              acao: params.configuracao.acao,
              recurso: params.configuracao.recurso
            })
          )
            throw new Error("Não autorizado.")

          return await params.handle(req, res)
        }
      }
    } catch (error: any) {
      res.status(200).json({
        success: false,
        message: error.message
      })
    }
  }
}
