import express from "express"
import { supplementsController } from "../cases/entry/supplements"
import { process } from "../lib/protection"

const supplements = express.Router()

supplements.get(
  "/themes/list",
  process({
    handle: async (req, res) => {
      res.status(200).json(await supplementsController.getSupplementsThemes())
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "supplements"
    }
  })
)

supplements.get(
  "/",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await supplementsController.supplementsContent({
          themeId: req.query.theme ? +req.query.theme : 1,
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "supplements"
    }
  })
)

supplements.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await supplementsController.supplementsById({
          id: +req.params.id,
          client: req.usuario.idcliente ? req.usuario.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "supplements"
    }
  })
)

export default supplements
