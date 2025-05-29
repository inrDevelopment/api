import express from "express"
import { boletimController } from "../cases/entry/boletim"
import { painelProccess } from "../lib/protection"

const boletimRoute = express.Router()

boletimRoute.post(
  "/novo",
  painelProccess({
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

boletimRoute.post(
  "/:id/editar",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.editarBoletim({
          id: +req.params.id,
          titulo: req.body.titulo,
          data: req.body.data,
          idusuario: 37 /* req.credenciais.idusuario */
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "editar"
    }
  })
)

export default boletimRoute
