import express from "express"
import { classifiersController } from "../cases/entry/classifiers"
import { process } from "../lib/protection"

const classifiersRoute = express.Router()

classifiersRoute.get(
  "/state",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getStateByTitle({
          state: req.query.acronym as "SP" | "PR" | "RS"
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

classifiersRoute.get(
  "/",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getClassifiersHome({
          id: req.query.id ? +req.query.id : 0,
          limit: req.query.limit ? +req.query.limit : 12,
          page: req.query.page ? +req.query.page : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

classifiersRoute.get(
  "/:id(\\d+)",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getClassifiersIndexById({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

classifiersRoute.get(
  "/act-content",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getClassifierContent({
          id: req.query.id ? +req.query.id : 0,
          client: /** req.credenciais ? req.credenciais.idcliente : null */ 37
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

classifiersRoute.get(
  "/previous-acts",
  process({
    handle: async (req, res) => {
      res.status(200).json(await classifiersController.getPreviousActs())
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

classifiersRoute.get(
  "/previous-bars",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getBarPreviousActs({
          idAto: req.query.idAto ? +req.query.idAto : 0
        })
      )
    },
    configuracao: {
      nivel: 0,
      acao: "read",
      recurso: "classificador"
    }
  })
)

export default classifiersRoute
