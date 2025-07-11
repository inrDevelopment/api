import express from "express"
import { opinionController } from "../cases/entry/opnion"
import { process } from "../lib/protection"
const opinion = express.Router()

opinion.get(
  "/",
  process({
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
      acao: "read",
      recurso: "opniao"
    }
  })
)

opinion.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await opinionController.getOpinionById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "opniao"
    }
  })
)

export default opinion
