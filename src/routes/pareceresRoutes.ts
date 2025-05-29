import express from "express"
import { pareceresController } from "../cases/entry/pareceres"
import { siteProccess } from "../lib/protection"

const pareceresRouter = express.Router()

pareceresRouter.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await pareceresController.pareceresContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "parecer"
    }
  })
)

pareceresRouter.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await pareceresController.getPareceresById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "parecer"
    }
  })
)

export default pareceresRouter
