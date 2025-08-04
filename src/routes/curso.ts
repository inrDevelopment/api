import express from "express"
import { cursoController } from "../cases/entry/curso"
import { process } from "../lib/protection"

const curso = express.Router()

curso.get(
  "/",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await cursoController.home({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "curso"
    }
  })
)

export default curso
