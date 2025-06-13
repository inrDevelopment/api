import express from "express"
import { userController } from "../cases/entry/user"
import { siteProccess } from "../lib/protection"
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
  siteProccess({
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

export default userRoute
