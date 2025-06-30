import express from "express"
import { questionsAnswersController } from "../cases/entry/questionAnswers"
import { process } from "../lib/protection"

const questionsAnswersRoute = express.Router()

questionsAnswersRoute.get(
  "/",
  process({
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
      acao: "read",
      recurso: "question"
    }
  })
)

questionsAnswersRoute.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await questionsAnswersController.getQuestionsAnswersById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "question"
    }
  })
)

export default questionsAnswersRoute
