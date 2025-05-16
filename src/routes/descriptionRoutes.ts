import express from "express"
import { descriptionController } from "../cases/entry/description"
import { siteProcess } from "../lib/protection"

const descriptionRoute = express.Router()

descriptionRoute.get(
  "/:id",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await descriptionController.get({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default descriptionRoute
