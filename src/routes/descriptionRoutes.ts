import express from "express"
import { descriptionController } from "../cases/entry/description"
import { siteProccess } from "../lib/protection"

const descriptionRoute = express.Router()

descriptionRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await descriptionController.get({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "descricao"
    }
  })
)

export default descriptionRoute
