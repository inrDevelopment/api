import express from "express"
import { homeController } from "../cases/entry/home"
import { siteProcess } from "../lib/protection"

const homeRoute = express.Router()

homeRoute.get(
  "/",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(await homeController.homeContent())
    },
    configuracao: {
      nivel: 0
    }
  })
)

homeRoute.get(
  "/curriculum",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(await homeController.curriculumContent())
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default homeRoute
