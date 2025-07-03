import express from "express"
import { recursoController } from "../cases/entry/recurso"
import { process } from "../lib/protection"
const recurso = express.Router()

recurso.post(
  "/",
  process({
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
    configuracao: { acao: "read", nivel: 0, recurso: "recurso" }
  })
)

recurso.post(
  "/novo",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.criarRecurso({
          nome: req.body.nome,
          icone: req.body.icone,
          url: req.body.url,
          recurso_tipo_id: req.body.recurso_tipo_id,
          ativo: req.body.ativo,
          tag: req.body.tag,
          idusuario: req.usuario.id,
          atributos: req.body.atributos
        })
      )
    },
    configuracao: { acao: "create", nivel: 0, recurso: "recurso" }
  })
)

recurso.get(
  "/:id(\\d+)",
  process({
    handle: async (req, res) => {
      res
        .status(200)
        .json(await recursoController.selecionarRecurso({ id: +req.params.id }))
    },
    configuracao: { acao: "read", nivel: 0, recurso: "recurso" }
  })
)

recurso.put(
  "/:id(\\d+)/editar",
  process({
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
          idusuario: req.usuario.id,
          atributos: req.body.atributos
        })
      )
    },
    configuracao: { acao: "update", nivel: 0, recurso: "recurso" }
  })
)

recurso.delete(
  "/:id(\\d+)/excluir",
  process({
    handle: async (req, res) => {
      res.status(200).json(
        await recursoController.excluirRecurso({
          id: +req.params.id,
          idusuario: req.usuario.id
        })
      )
    },
    configuracao: { acao: "delete", nivel: 0, recurso: "recurso" }
  })
)

export default recurso
