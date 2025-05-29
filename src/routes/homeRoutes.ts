import express from "express"
import { homeController } from "../cases/entry/home"
import { siteProccess } from "../lib/protection"

const homeRoute = express.Router()

homeRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(await homeController.homeContent())
    },
    configuracao: {
      nivel: 0,
      recurso: "home",
      acao: "ler"
    }
  })
)

homeRoute.get(
  "/curriculum",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(await homeController.curriculumContent())
    },
    configuracao: {
      nivel: 0,
      recurso: "home",
      acao: "ler"
    }
  })
)

export default homeRoute
