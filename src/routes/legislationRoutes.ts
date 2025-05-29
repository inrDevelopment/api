import express from "express"
import { legislationController } from "../cases/entry/legislation"
import { siteProccess } from "../lib/protection"
const legislationRoute = express.Router()

legislationRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await legislationController.legislationContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "legislacao"
    }
  })
)

legislationRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await legislationController.getLegislationById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "legislacao"
    }
  })
)

export default legislationRoute
