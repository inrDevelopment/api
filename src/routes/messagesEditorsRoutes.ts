import express from "express"
import { messagesEditorsController } from "../cases/entry/messagesEditor"
import { process } from "../lib/protection"
const messagesEditorsRoute = express.Router()

messagesEditorsRoute.get(
  "/",
  process({
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
      acao: "read",
      recurso: "menssagemeditores"
    }
  })
)

messagesEditorsRoute.get(
  "/:id",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await messagesEditorsController.getMessagesEditorsById({
          id: +req.params.id,
          client: req.usuario.idcliente
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "menssagemeditores"
    }
  })
)

export default messagesEditorsRoute
