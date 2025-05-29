import express from "express"
import { userController } from "../cases/entry/user"
import { siteProccess } from "../lib/protection"
const userRoute = express.Router()

userRoute.post(
  "/authentication",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.authentication({
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

export default userRoute
