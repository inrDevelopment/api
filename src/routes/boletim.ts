import express from "express"
import { boletimController } from "../cases/entry/boletim"
import { process } from "../lib/protection"

const boletimRoute = express.Router()

boletimRoute.post(
  "/novo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.novoBoletim({
          titulo: req.body.titulo,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "create"
    }
  })
)

boletimRoute.put(
  "/:id/update",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.editarBoletim({
          id: +req.params.id,
          titulo: req.body.titulo,
          data: req.body.data,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "update"
    }
  })
)

boletimRoute.post(
  "/item",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.adicionarItemBoletim({
          id: req.body.id,
          idBoletim: +req.body.idBoletim,
          boletimConteudoTipoId: req.body.boletimConteudoTipoId,
          ordem: req.body.ordem
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "create"
    }
  })
)

boletimRoute.put(
  "/item/:id/update",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.editarItemBoletim({
          id: +req.params.id,
          conteudoTipoId: req.body.boletimConteudoTipoId,
          boletimId: req.body.idBoletim,
          identificador: req.body.identificador,
          ordem: req.body.ordem
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "update"
    }
  })
)

boletimRoute.delete(
  "/item/:id/delete",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.excluirItemBoletim({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "boletim",
      acao: "delete"
    }
  })
)

export default boletimRoute
