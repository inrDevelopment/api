import express from "express"
import leitorController from "../cases/entry/leitor"
import { userController } from "../cases/entry/user"
import { painelProccess, siteProccess } from "../lib/protection"
const userRoute = express.Router()

userRoute.post(
  "/autenticacao/site",
  siteProccess({
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
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.post(
  "/autenticacao/painel",
  painelProccess({
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
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.post(
  "/autenticacao/app",
  painelProccess({
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
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.get(
  "/recuperacao-acesso/email/painel",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoEmailPainel({
          email: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.get(
  "/recuperacao-acesso/email/site",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoEmailSite({
          email: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.get(
  "/recuperacao-acesso/cel/painel",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoCelPainel({
          cell: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.get(
  "/recuperacao-acesso/cel/site",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoCelSite({
          cell: req.query.v ? req.query.v.toString() : ""
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.post(
  "/recuperacao-acesso/finalizar/painel",
  painelProccess({
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
      acao: "ler",
      recurso: "usuario"
    }
  })
)

userRoute.post(
  "/recuperacao-acesso/finalizar/site",
  painelProccess({
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
      acao: "ler",
      recurso: "usuario"
    }
  })
)

export default userRoute
