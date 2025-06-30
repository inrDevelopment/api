import express from "express"
import { homeController } from "../cases/entry/home"
import { process } from "../lib/protection"

const homeRoute = express.Router()

homeRoute.get(
  "/",
  process({
    handle: async (req, res) => {
      res.status(200).json(await homeController.homeContent())
    },
    configuracao: {
      nivel: 0,
      recurso: "home",
      acao: "read"
    }
  })
)

homeRoute.get(
  "/curriculum",
  process({
    handle: async (req, res) => {
      res.status(200).json(await homeController.curriculumContent())
    },
    configuracao: {
      nivel: 0,
      recurso: "home",
      acao: "read"
    }
  })
)

export default homeRoute
