import express from "express"
import { supplementsController } from "../cases/entry/supplements"
import { siteProccess } from "../lib/protection"

const supplementsRoutes = express.Router()

supplementsRoutes.get(
  "/themes/list",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(await supplementsController.getSupplementsThemes())
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "themes"
    }
  })
)

supplementsRoutes.get(
  "/",
  siteProccess({
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
      acao: "ler",
      recurso: "themes"
    }
  })
)

supplementsRoutes.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await supplementsController.supplementsById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "themes"
    }
  })
)

export default supplementsRoutes
