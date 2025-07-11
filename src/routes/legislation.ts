import express from "express"
import { legislationController } from "../cases/entry/legislation"
import { process } from "../lib/protection"
const legislation = express.Router()

legislation.get(
  "/",
  process({
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
      acao: "read",
      recurso: "legislacao"
    }
  })
)

legislation.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await legislationController.getLegislationById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "legislacao"
    }
  })
)

export default legislation
