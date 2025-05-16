import express from "express"
import { questionsAnswersController } from "../cases/entry/questionAnswers"
import { siteProcess } from "../lib/protection"

const questionsAnswersRoute = express.Router()

questionsAnswersRoute.get(
  "/",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await questionsAnswersController.questionsAnswersContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

questionsAnswersRoute.get(
  "/:id",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await questionsAnswersController.getQuestionsAnswersById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default questionsAnswersRoute
