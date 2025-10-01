import express from "express"
import { userController } from "../cases/entry/user"
import { process } from "../lib/protection"
const user = express.Router()

user.post(
  "/autenticacao/site",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.siteAuth({
          login: req.body.login,
          senha: req.body.senha
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "usuario"
    }
  })
)

user.post(
  "/autenticacao/painel",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.painelAuth({
          login: req.body.login,
          senha: req.body.senha,
          keep: req.body.keep
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "usuario"
    }
  })
)

user.post(
  "/autenticacao/app",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.appAuth({
          login: req.body.login,
          senha: req.body.senha,
          uuid: req.body.uuid
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "usuario"
    }
  })
)

user.post(
  "/autenticacao/desktop",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.desktopAuth({
          login: req.body.login,
          senha: req.body.senha,
          uuid: req.body.uuid
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "usuario"
    }
  })
)

user.get(
  "/recuperacao-acesso/email/painel",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoEmailPainel({
          email: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

user.get(
  "/recuperacao-acesso/email/site",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoEmailSite({
          email: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

user.get(
  "/recuperacao-acesso/cel/painel",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoCelPainel({
          cell: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

user.get(
  "/recuperacao-acesso/cel/site",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoCelSite({
          cell: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

user.post(
  "/recuperacao-acesso/finalizar/painel",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.confirmaRecuperacaoPainel({
          token: req.body.token,
          senha: req.body.senha
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

user.post(
  "/recuperacao-acesso/finalizar/site",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.confirmaRecuperacaoSite({
          token: req.body.token,
          senha: req.body.senha
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "update",
      recurso: "usuario"
    }
  })
)

export default user
