import express from "express"
import newsController from "../cases/entry/news"
import { siteProccess } from "../lib/protection"
const newsRoute = express.Router()

newsRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await newsController.newsHome({
          page: req.query.page ? +req.query.page : 0,
          limit: req.query.limit ? +req.query.limit : 12
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "noticias"
    }
  })
)

newsRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await newsController.getNewsById({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "noticias"
    }
  })
)

export default newsRoute
