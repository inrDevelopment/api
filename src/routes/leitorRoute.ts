import express from "express"
import leitorController from "../cases/entry/leitor"
import { mobileProccess } from "../lib/protection"
const leitorRoute = express.Router()

leitorRoute.post(
  "/boletims/privado",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarBoletinsPrivado({
          numero: req.body.numero,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: req.credenciais.id,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "leitor",
      acao: "ler"
    }
  })
)

leitorRoute.post(
  "/boletims/publico",
  mobileProccess({
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
      acao: "ler"
    }
  })
)

leitorRoute.get(
  "/leitura/:id(\\d+)/adicionar",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsReaded({
          idboletim: +req.params.id,
          idusuario: req.credenciais.idusuario
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "leitor",
      acao: "criar"
    }
  })
)

leitorRoute.delete(
  "/leitura/:id(\\d+)/remover",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsUnreaded({
          idboletim: +req.params.id,
          idusuario: req.credenciais.idusuario
        })
      )
    },
    configuracao: {
      nivel: 2,
      recurso: "leitor",
      acao: "excluir"
    }
  })
)

leitorRoute.get(
  "/favorito/:id(\\d+)/adicionar",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.favoriteThis({
          idboletim: +req.params.id,
          idusuario: 8893 /* req.credenciais.idusuario */
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "criar"
    }
  })
)

leitorRoute.delete(
  "/favorito/:id(\\d+)/remover",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.unfavoriteThis({
          idboletim: +req.params.id,
          idusuario: 8893 /* req.credenciais.idusuario */
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "excluir"
    }
  })
)

leitorRoute.get(
  "/ultimo-boletim",
  mobileProccess({
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
      acao: "criar"
    }
  })
)

leitorRoute.post(
  "/favorito",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarFavoritos({
          numero: req.body.numero,
          boletim_tipo_id: req.body.boletim_tipo_id,
          data: req.body.data,
          idusuario: req.credenciais.id,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "ler"
    }
  })
)

leitorRoute.post(
  "/registrar",
  mobileProccess({
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
      acao: "criar"
    }
  })
)

leitorRoute.post(
  "/autenticacao",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.login({
          login: req.body.login,
          senha: req.body.senha,
          uuid: req.body.uuid
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "ler"
    }
  })
)

leitorRoute.get(
  "/ler",
  mobileProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.lerBoletim({
          id: req.query.id ? +req.query.id : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      recurso: "leitor",
      acao: "criar"
    }
  })
)

export default leitorRoute
