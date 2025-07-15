//#region imports
import { defaultResponse } from "../core/defaultResponse"
import RecursoRepository from "../repositories/Recurso"
import UserRepository from "../repositories/User"
import { excluirRecursoServiceProps } from "../schemas/excluirRecurso"
import { listarRecursoServiceProps } from "../schemas/listarRecurso"
import { listarTipoRecursoServiceProps } from "../schemas/listaTipoRecurso"
import { salvarRecursoServiceProps } from "../schemas/salvarRecurso"
import { selecionarRecursoServiceProps } from "../schemas/selecionarRecurso"
//#endregion imports

export default class RecursoService {
  constructor(
    private recursoRepository: RecursoRepository,
    private userRepository: UserRepository
  ) {}

  async listarRecurso(
    params: listarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.recursoRepository.lista({
        nome: params.nome,
        tag: params.tag,
        url: params.url,
        ativo: params.ativo,
        recurso_tipo_id: params.recurso_tipo_id,
        limite: params.limite,
        pagina: params.pagina * params.limite
      })

      const count = await this.recursoRepository.count({
        nome: params.nome,
        tag: params.tag,
        url: params.url,
        ativo: params.ativo,
        recurso_tipo_id: params.recurso_tipo_id
      })

      if (!count) throw new Error("Erro ao listar os recursos.")

      return {
        success: true,
        data: { list, count: count.count }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listaTipo(
    params: listarTipoRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.recursoRepository.tipoRecursoList({
        limite: params.limite,
        pagina: params.pagina
      })

      const count = await this.recursoRepository.tipoRecursoListCount()

      return {
        success: true,
        data: { list, count }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async selecionarRecurso(
    params: selecionarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.recursoRepository.selecionar({
        id: params.id
      })

      if (!response) throw new Error("Erro ao selecionar o recurso.")

      return {
        success: true,
        data: response
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async excluirRecurso(
    params: excluirRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.recursoRepository.excluir({
        id: params.id,
        idusuario: params.idusuario
      })

      if (response.affectedRows <= 0)
        throw new Error("Nada foi alterado. favor verificar.")

      return {
        success: true,
        message: "Recurso excluido com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async salvarRecurso(
    params: salvarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      if (!params.id) {
        const existNome = await this.recursoRepository.verificaCriarNome({
          nome: params.nome
        })

        if (!existNome) throw new Error("Erro ao verificar contéudo.")
        if (existNome.count >= 1)
          throw new Error("Ja existe um recurso com esse nome.")

        const existTag = await this.recursoRepository.verificaCriarTag({
          tag: params.tag
        })
        if (!existTag) throw new Error("Erro ao verificar contéudo.")
        if (existTag.count >= 1)
          throw new Error("Ja existe um recurso com essa tag.")

        const existUrl = await this.recursoRepository.verificaCriarUrl({
          url: params.url
        })
        if (!existUrl) throw new Error("Erro ao verificar contéudo.")
        if (existUrl.count >= 1)
          throw new Error("Ja existe um recurso com esse url.")

        const novoRecurso = await this.recursoRepository.criar({
          recurso_tipo_id: params.recurso_tipo_id,
          nome: params.nome,
          tag: params.tag,
          icone: params.icone,
          url: params.url,
          ativo: params.ativo,
          idusuario: params.idusuario
        })

        if (!novoRecurso) throw new Error("Erro ao criar o recurso.")

        const nomeUsuario = await this.userRepository.getUserName({
          id: params.idusuario
        })

        if (!nomeUsuario)
          throw new Error(
            "Erro ao identificar usuário responsável pela criação."
          )

        console.log(novoRecurso)

        return {
          success: true,
          data: {
            id: novoRecurso.id,
            criadonome: nomeUsuario.nome,
            criadoem: new Date(),
            editadonome: null,
            editadoem: null
          },
          message: "Recurso criado com sucesso."
        }
      } else {
        const existNome = await this.recursoRepository.verificaEditarNome({
          nome: params.nome,
          id: params.id
        })
        if (!existNome) throw new Error("Erro ao verificar contéudo.")
        if (existNome.count >= 1)
          throw new Error("Ja existe outro recurso com esse nome.")

        const existTag = await this.recursoRepository.verificaEditarTag({
          tag: params.tag,
          id: params.id
        })
        if (!existTag) throw new Error("Erro ao verificar contéudo.")
        if (existTag.count >= 1)
          throw new Error("Ja existe outro recurso com essa tag.")

        const existUrl = await this.recursoRepository.verificaEditarUrl({
          url: params.url,
          id: params.id
        })
        if (!existUrl) throw new Error("Erro ao verificar contéudo.")
        if (existUrl.count >= 1)
          throw new Error("Ja existe outro recurso com esse url.")

        const recurso = await this.recursoRepository.editar({
          ativo: params.ativo,
          icone: params.icone,
          id: params.id,
          idusuario: params.idusuario,
          nome: params.nome,
          recurso_tipo_id: params.recurso_tipo_id,
          tag: params.tag,
          url: params.url
        })

        if (recurso.affectedRows <= 0) throw new Error("Nada foi alterado.")

        const nomeUsuario = await this.userRepository.getUserName({
          id: params.idusuario
        })

        if (!nomeUsuario)
          throw new Error(
            "Erro ao identificar usuário responsável pela edição."
          )

        const recursoDetalhes = await this.recursoRepository.selecionar({
          id: params.id
        })

        if (!recursoDetalhes)
          throw new Error(
            "Erro ao identificar usuário responsável pela edição."
          )

        return {
          success: true,
          data: {
            id: recursoDetalhes.id,
            criadonome: recursoDetalhes.criadonome,
            criadoem: recursoDetalhes.criadoem,
            editadonome: recursoDetalhes.editadonome,
            editadoem: recursoDetalhes.editadoem
          },
          message: "Recurso editado com sucesso."
        }
      }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }
}
