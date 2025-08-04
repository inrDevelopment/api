import express from "express"
import { boletimController } from "../cases/entry/boletim"
import { process } from "../lib/protection"

const boletimRoute = express.Router()

boletimRoute.post(
  "/novo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.start({
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: +req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "create"
    }
  })
)

boletimRoute.get(
  "/tipo",
  process({
    handle: async (req, res) => {
      res.status(200).json(await boletimController.tipo())
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "read"
    }
  })
)

boletimRoute.get(
  "/conteudo/tipo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.conteudoTipo({
          idtipoboletim: req.query.idtipoboletim ? +req.query.idtipoboletim : 0
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "read"
    }
  })
)

boletimRoute.get(
  "/:id(\\d+)",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.select({
          idBoletim: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "read"
    }
  })
)

boletimRoute.put(
  "/:idBoletim(\\d+)/conteudo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.saveConteudo({
          idBoletim: +req.params.idBoletim,
          conteudo: req.body.conteudo,
          idusuario: +req.usuario.id,
          nomeusuario: req.usuario.nome
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "read"
    }
  })
)

boletimRoute.get(
  "/:idBoletim(\\d+)/conteudo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.getConteudo({
          idBoletim: +req.params.idBoletim
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "read"
    }
  })
)

boletimRoute.put(
  "/:idBoletim(\\d+)/observacao",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.saveObservacao({
          idBoletim: +req.params.idBoletim,
          observacao: req.body.observacao,
          idusuario: +req.usuario.id,
          nomeusuario: req.usuario.nome
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "update"
    }
  })
)

boletimRoute.post(
  "/:idBoletim(\\d+)/aprovar",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.aprovar({
          idBoletim: +req.params.idBoletim,
          idUsuario: +req.usuario.id,
          nomeUsuario: req.usuario.nome
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "approve"
    }
  })
)

boletimRoute.post(
  "/:idBoletim(\\d+)/publicar",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await boletimController.publicar({
          idBoletim: +req.params.idBoletim,
          idUsuario: +req.usuario.id,
          nomeUsuario: req.usuario.nome
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "boletim",
      acao: "publish"
    }
  })
)

export default boletimRoute
