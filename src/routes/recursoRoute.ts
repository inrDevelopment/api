import express from "express"
import { recursoController } from "../cases/entry/recurso"
import { painelProccess } from "../lib/protection"
const recursoRoutes = express.Router()

recursoRoutes.post(
  "/",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.listarRecurso({
          nome: req.body.nome,
          icone: req.body.icone,
          url: req.body.url,
          recurso_tipo_id: req.body.recurso_tipo_id,
          ativo: req.body.ativo,
          tag: req.body.tag,
          limite: req.body.limite,
          pagina: req.body.pagina
        })
      )
    },
    configuracao: { acao: "ler", nivel: 0, recurso: "recurso" }
  })
)

recursoRoutes.post(
  "/novo",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.criarRecurso({
          nome: req.body.nome,
          icone: req.body.icone,
          url: req.body.url,
          recurso_tipo_id: req.body.recurso_tipo_id,
          ativo: req.body.ativo,
          tag: req.body.tag,
          idusuario: req.credenciais.id,
          atributos: req.body.atributos
        })
      )
    },
    configuracao: { acao: "criar", nivel: 0, recurso: "recurso" }
  })
)

recursoRoutes.get(
  "/:id(\\d+)",
  painelProccess({
    handle: async (req, res) => {
      res
        .status(200)
        .json(await recursoController.selecionarRecurso({ id: +req.params.id }))
    },
    configuracao: { acao: "aprovar", nivel: 0, recurso: "recurso" }
  })
)

recursoRoutes.put(
  "/:id(\\d+)/editar",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.editarRecurso({
          id: +req.params.id,
          nome: req.body.nome,
          icone: req.body.icone,
          url: req.body.url,
          tag: req.body.tag,
          ativo: req.body.ativo,
          recurso_tipo_id: req.body.recurso_tipo_id,
          idusuario: req.credenciais.id,
          atributos: req.body.atributos
        })
      )
    },
    configuracao: { acao: "aprovar", nivel: 0, recurso: "recurso" }
  })
)

recursoRoutes.delete(
  "/:id(\\d+)/excluir",
  painelProccess({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.excluirRecurso({
          id: +req.params.id,
          idusuario: req.credenciais.id
        })
      )
    },
    configuracao: { acao: "aprovar", nivel: 0, recurso: "recurso" }
  })
)

export default recursoRoutes
