import express from "express"
import { classifiersController } from "../cases/entry/classifiers"
import { siteProcess } from "../lib/protection"

const classifiersRoute = express.Router()

/**
 * @swagger
 * /classifiers/state:
 *   get:
 *     summary: Seleciona Classificadores por estado
 *     tags:
 *       - classifiers
 *     responses:
 *       200:
 *         description: Success
 */
classifiersRoute.get(
  "/state",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getStateByTitle({
          state: req.query.acronym as "SP" | "PR" | "RS"
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

/**
 * @swagger
 * /classifiers/:
 *  get:
 *    summary: lista classificadores por id do estado
 *    tags:
 *      - classifiers
 *    responses:
 *      200:
 *        description: Sucesso
 */
classifiersRoute.get(
  "/",
  siteProcess({
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
      nivel: 0
    }
  })
)

/**
 * @swagger
 * /classifiers/id:
 *  get:
 *    summary: lista classificadores por id do estado
 *    tags:
 *      - classifiers
 *    responses:
 *      200:
 *        description: Sucesso
 */
classifiersRoute.get(
  "/:id(\\d+)",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getClassifiersIndexById({
          id: +req.params.id
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

classifiersRoute.get(
  "/act-content",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getClassifierContent({
          id: req.query.id ? +req.query.id : 0,
          client: req.credenciais ? req.credenciais.idcliente : null
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

classifiersRoute.get(
  "/previous-acts",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(await classifiersController.getPreviousActs())
    },
    configuracao: {
      nivel: 0
    }
  })
)

classifiersRoute.get(
  "/previous-bars",
  siteProcess({
    handle: async (req, res) => {
      res.status(200).json(
        await classifiersController.getBarPreviousActs({
          idAto: req.query.idAto ? +req.query.idAto : 0
        })
      )
    },
    configuracao: {
      nivel: 0
    }
  })
)

export default classifiersRoute
