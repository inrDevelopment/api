import express from "express"
import { messagesEditorsController } from "../cases/entry/messagesEditor"
import { siteProccess } from "../lib/protection"
const messagesEditorsRoute = express.Router()

messagesEditorsRoute.get(
  "/",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await messagesEditorsController.messagesEditorsContent({
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "menssagemeditores"
    }
  })
)

messagesEditorsRoute.get(
  "/:id",
  siteProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await messagesEditorsController.getMessagesEditorsById({
          id: +req.params.id,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "ler",
      recurso: "menssagemeditores"
    }
  })
)

export default messagesEditorsRoute
