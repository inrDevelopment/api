import { Request, Response } from "express"
import { verify } from "jsonwebtoken"
import {
  defaultResponse,
  IUsuarioInterno,
  Meta,
  params,
  UsuarioInterno
} from ".."
import application from "../../../config/application"

export function process(
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

          try {
            const paramConstructor: IUsuarioInterno = verify(
              req.headers["credential"].toString(),
              application.key
            ) as IUsuarioInterno

            req.usuario = new UsuarioInterno(paramConstructor)
          } catch (error: any) {
            throw new Error("Erro ao validar credenciais do usuário.")
          }

          return await params.handle(req, res)
        }
        case 2: {
          if (!req.headers["credential"]) throw new Error("Não autorizado")

          try {
            const paramConstructor: IUsuarioInterno = verify(
              req.headers["credential"].toString(),
              application.key
            ) as IUsuarioInterno

            req.usuario = new UsuarioInterno(paramConstructor)
          } catch (error: any) {
            throw new Error("Erro ao validar credenciais do usuário.")
          }

          if (
            req.usuario.seguranca({
              recurso: params.configuracao.recurso,
              acao: params.configuracao.acao
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
