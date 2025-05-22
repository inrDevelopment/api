import express from "express"
import { boletimController } from "../cases/entry/boletim"
import { painelProcess } from "../lib/protection"

const boletimRoute = express.Router()

boletimRoute.post(
  "/novo",
  painelProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.novoBoletim({
          titulo: req.body.titulo,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: 37 /* req.credenciais.idusuario */
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "criar"
    }
  })
)

export default boletimRoute
