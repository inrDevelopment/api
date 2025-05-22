import express from "express"
import newsController from "../cases/entry/news"
import { siteProcess } from "../lib/protection"
const newsRoute = express.Router()

newsRoute.get(
  "/",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await newsController.newsHome({
          page: req.query.page ? +req.query.page : 0,
          limit: req.query.limit ? +req.query.limit : 12
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

newsRoute.get(
  "/:id",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await newsController.getNewsById({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default newsRoute
