import express from "express"
import { opinionController } from "../cases/entry/opnion"
import { siteProccess } from "../lib/protection"
const opinionRoute = express.Router()

opinionRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await opinionController.opinionContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "opniao"
    }
  })
)

opinionRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await opinionController.getOpinionById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "opniao"
    }
  })
)

export default opinionRoute
