import express from "express"
import { messagesEditorsController } from "../cases/entry/messagesEditor"
import { siteProcess } from "../lib/protection"
const messagesEditorsRoute = express.Router()

messagesEditorsRoute.get(
  "/",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await messagesEditorsController.messagesEditorsContent({
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

messagesEditorsRoute.get(
  "/:id",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await messagesEditorsController.getMessagesEditorsById({
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

export default messagesEditorsRoute
