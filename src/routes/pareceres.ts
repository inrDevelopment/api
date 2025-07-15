import express from "express"
import { pareceresController } from "../cases/entry/pareceres"
import { process } from "../lib/protection"

const pareceres = express.Router()

pareceres.get(
  "/",
  process({
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
      acao: "read",
      recurso: "parecer"
    }
  })
)

pareceres.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await pareceresController.getPareceresById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "parecer"
    }
  })
)

export default pareceres
