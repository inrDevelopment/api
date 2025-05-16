import express from "express"
import UserController from "../cases/controllers/User"
import UserRepository from "../cases/repositories/User"
import UserService from "../cases/services/User"
import { siteProcess } from "../lib/protection"
const userRoute = express.Router()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoute.post(
  "/authentication",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await userController.authentication({
          login: req.body.login,
          senha: req.body.senha
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default userRoute
