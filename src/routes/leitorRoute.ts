import express from "express"
import leitorController from "../cases/entry/leitor"
import { mobileProccess, siteProccess } from "../lib/protection"
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
          idusuario: 8893 /* req.credenciais.id*/,
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
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsReaded({
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
  "/leitura/:id(\\d+)/remover",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.markAsUnreaded({
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
  "/favorito/:id(\\d+)/adicionar",
  siteProccess({
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
  siteProccess({
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

leitorRoute.post(
  "/favorito",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await leitorController.listarFavoritos({
          titulo: req.body.titulo,
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

leitorRoute.post(
  "/registrar",
  siteProccess({
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
      acao: "ler"
    }
  })
)

leitorRoute.post(
  "/autenticacao",
  siteProccess({
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

export default leitorRoute
