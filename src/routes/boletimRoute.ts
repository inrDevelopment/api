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

boletimRoute.put(
  "/:id/update",
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

boletimRoute.post(
  "/item",
  painelProccess({
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
      acao: "criar"
    }
  })
)

boletimRoute.put(
  "/item/:id/update",
  painelProccess({
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
      acao: "editar"
    }
  })
)

boletimRoute.delete(
  "/item/:id/delete",
  painelProccess({
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
      acao: "excluir"
    }
  })
)

export default boletimRoute
