import express from "express"
import { questionsAnswersController } from "../cases/entry/questionAnswers"
import { siteProccess } from "../lib/protection"

const questionsAnswersRoute = express.Router()

questionsAnswersRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await questionsAnswersController.questionsAnswersContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "question"
    }
  })
)

questionsAnswersRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await questionsAnswersController.getQuestionsAnswersById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "question"
    }
  })
)

export default questionsAnswersRoute
