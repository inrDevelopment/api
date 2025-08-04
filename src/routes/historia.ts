import express from "express"
import { historiaController } from "../cases/entry/historia"
import { process } from "../lib/protection"

const historia = express.Router()

historia.get(
  "/",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await historiaController.home({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "historia"
    }
  })
)

export default historia
