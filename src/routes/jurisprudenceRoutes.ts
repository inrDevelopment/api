import express from "express"
import { jurisprudenceController } from "../cases/entry/jurisprudence"
import { siteProccess } from "../lib/protection"

const jurisprudenceRoute = express.Router()

jurisprudenceRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await jurisprudenceController.jurisprudenceContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "jurisprudencia",
      acao: "ler"
    }
  })
)

jurisprudenceRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await jurisprudenceController.getJurisprudenceById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "jurisprudencia",
      acao: "ler"
    }
  })
)

export default jurisprudenceRoute
