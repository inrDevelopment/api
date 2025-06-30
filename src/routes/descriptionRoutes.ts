import express from "express"
import { descriptionController } from "../cases/entry/description"
import { process } from "../lib/protection"

const descriptionRoute = express.Router()

descriptionRoute.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await descriptionController.get({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "descricao"
    }
  })
)

export default descriptionRoute
