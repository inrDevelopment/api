import express from "express"
import leitorController from "../cases/entry/leitor"
import { process } from "../lib/protection"
const leitor = express.Router()

leitor.post(
  "/boletims/privado",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarBoletinsPrivado({
          numero: req.body.numero,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: req.usuario.id,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "read"
    }
  })
)

leitor.post(
  "/boletims/publico",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarBoletinsPublico({
          numero: req.body.numero,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "read"
    }
  })
)

leitor.get(
  "/leitura/:id(\\d+)/adicionar",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsReaded({
          idboletim: +req.params.id,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "create"
    }
  })
)

leitor.delete(
  "/leitura/:id(\\d+)/remover",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsUnreaded({
          idboletim: +req.params.id,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "delete"
    }
  })
)

leitor.get(
  "/favorito/:id(\\d+)/adicionar",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.favoriteThis({
          idboletim: +req.params.id,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "create"
    }
  })
)

leitor.delete(
  "/favorito/:id(\\d+)/remover",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.unfavoriteThis({
          idboletim: +req.params.id,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "delete"
    }
  })
)

leitor.get(
  "/ultimo-boletim",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.ultimoConteudo({
          tipo_id: req.query.id ? +req.query.id : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "create"
    }
  })
)

leitor.post(
  "/favorito",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarFavoritos({
          numero: req.body.numero,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: req.usuario.id,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "read"
    }
  })
)

leitor.post(
  "/registrar",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.register({
          uuid: req.body.uuid,
          token: req.body.token
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "create"
    }
  })
)

leitor.get(
  "/ler/privado",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.lerBoletimPrivado({
          id: req.query.id ? +req.query.id : 0,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: {
      nivel: 1,
      recurso: "leitor",
      acao: "read"
    }
  })
)

leitor.get(
  "/ler/publico",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.lerBoletimPublico({
          id: req.query.id ? +req.query.id : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "read"
    }
  })
)

export default leitor
