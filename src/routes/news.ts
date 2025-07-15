import express from "express"
import newsController from "../cases/entry/news"
import { process } from "../lib/protection"
const news = express.Router()

news.get(
  "/",
  process({
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
      acao: "read",
      recurso: "noticias"
    }
  })
)

news.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await newsController.getNewsById({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "noticias"
    }
  })
)

export default news
