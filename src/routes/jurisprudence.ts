import express from "express"
import { jurisprudenceController } from "../cases/entry/jurisprudence"
import { process } from "../lib/protection"

const jurisprudence = express.Router()

jurisprudence.get(
  "/",
  process({
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
      acao: "read"
    }
  })
)

jurisprudence.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await jurisprudenceController.getJurisprudenceById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "jurisprudencia",
      acao: "read"
    }
  })
)

export default jurisprudence
