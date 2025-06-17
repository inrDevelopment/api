import express from "express"
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

userRoute.get(
  "/recuperacao-acesso/email",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoEmail({
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
  "/recuperacao-acesso/cel",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.recuperacaoCel({
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
  "/recuperacao-acesso/finalizar",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.confirmaRecuperacao({
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
