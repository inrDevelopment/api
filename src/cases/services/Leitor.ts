//#region imports
import { defaultResponse } from "../core/defaultResponse"
import BoletimRepository from "../repositories/Boletim"
import { favoriteThisServiceProps } from "../schemas/favoriteThis"
import { getBoletimLeituraPrivadoServiceProps } from "../schemas/getBoletimLeituraPrivado"
import { getBoletimLeituraPublicoServiceProps } from "../schemas/getBoletimLeituraPublico"
import { listarBoletimPrivadoServiceProps } from "../schemas/listarBoletimPrivado"
import { listarBoletimPublicoServiceProps } from "../schemas/listarBoletimPublico"
import { listarFavoritoServiceProps } from "../schemas/listarFavorito"
import { markAsReadedServiceProps } from "../schemas/markAsReaded"
import { markAsUnreadedServiceProps } from "../schemas/markAsUnreaded"
import { registerServiceProps } from "../schemas/register"
import { ultimoConteudoServiceProps } from "../schemas/ultimoConteudo"
import { unfavoriteThisServiceProps } from "../schemas/unfavoriteThis"
//#endregion imports

export default class LeitorService {
  constructor(private boletimRepository: BoletimRepository) {}

  async listarBoletinsPrivado(
    params: listarBoletimPrivadoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listarBoletim({
        idUsuario: params.idusuario,
        numero: params.numero ?? "NULL",
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data ?? "NULL",
        limite: params.limite,
        pagina: params.pagina * params.limite
      })

      const res = await this.boletimRepository.listarBoletimCount({
        numero: params.numero ?? "NULL",
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data ?? "NULL"
      })

      if (!res) throw new Error("Erro ao listar os boletins.")

      return {
        success: true,
        data: {
          list,
          count: res.count
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarBoletinsPublico(
    params: listarBoletimPublicoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listarBoletimPublico({
        numero: params.numero ?? "NULL",
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data ?? "NULL",
        limite: params.limite,
        pagina: params.pagina
      })

      const res = await this.boletimRepository.listarBoletimCount({
        numero: params.numero ?? "NULL",
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data ?? "NULL"
      })

      if (!res) throw new Error("Erro ao listar os boletins.")

      return {
        success: true,
        data: {
          list,
          count: res.count
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async markAsReaded(
    params: markAsReadedServiceProps
  ): Promise<defaultResponse> {
    try {
      const verifica = await this.boletimRepository.verificaMarcacaoLeitura({
        idBoletim: params.idboletim,
        idUsuario: params.idusuario
      })

      if (!verifica) throw new Error("Erro ao verificar o boletim.")

      if (verifica.count >= 1)
        throw new Error("Este boletim ja foi adicionado em seus favoritos.")

      const res = await this.boletimRepository.markAsReaded(params)

      if (res.affectedRows <= 0)
        throw new Error("Erro ao marcar boletim como lido.")

      return {
        success: true,
        message: "Boletim marcado como lido."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async markAsUnReaded(
    params: markAsUnreadedServiceProps
  ): Promise<defaultResponse> {
    try {
      const res = await this.boletimRepository.markAsUnreaded(params)

      if (!res) throw new Error("Erro ao marcar boletim como não lido.")

      return {
        success: true,
        message: "Boletim marcado como não lido."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async favoriteThis(
    params: favoriteThisServiceProps
  ): Promise<defaultResponse> {
    try {
      const verifica = await this.boletimRepository.verificaFavorito({
        idBoletim: params.idboletim,
        idUsuario: params.idusuario
      })

      if (!verifica) throw new Error("Erro ao verificar favoritos.")

      if (verifica.count >= 1)
        throw new Error("Você já favoritou esse boletim.")

      const res = await this.boletimRepository.favoriteThis({
        idBoletim: params.idboletim,
        idUsuario: params.idusuario
      })

      if (!res) throw new Error("Erro ao marcar boletim como favorito.")

      if (res.affectedRows <= 0)
        throw new Error("Erro ao marcar boletim como favorito.")

      return {
        success: true,
        message: "Boletim marcado como favorito."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async unfavoriteThis(
    params: unfavoriteThisServiceProps
  ): Promise<defaultResponse> {
    try {
      const res = await this.boletimRepository.unfavoriteThis({
        idBoletim: params.idboletim,
        idUsuario: params.idusuario
      })

      if (!res) throw new Error("Erro ao remover o boletim dos favorito.")

      if (res.affectedRows <= 0)
        throw new Error("Erro ao remover o boletim dos favorito.")

      return {
        success: true,
        message: "Boletim removido dos favoritos."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarFavoritos(
    params: listarFavoritoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listaFavoritos({
        idUsuario: params.idusuario,
        tipo_id: params.boletim_tipo_id,
        numero: params.numero,
        data_boletim: params.data,
        limite: params.limite,
        pagina: params.pagina
      })

      const count = await this.boletimRepository.listaFavoritosCount({
        idUsuario: params.idusuario,
        tipo_id: params.boletim_tipo_id,
        numero: params.numero,
        data_boletim: params.data
      })

      if (!count) throw new Error("Erro ao listar os favoritos.")

      return {
        success: true,
        data: {
          list,
          count: count.count
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async register(params: registerServiceProps): Promise<defaultResponse> {
    try {
      const verificacao = await this.boletimRepository.verificaToken({
        uuid: params.uuid
      })

      if (!verificacao) throw new Error("Erro ao verificar token de usuário.")

      let response: {
        affectedRows: number
      }

      if (verificacao.count <= 0) {
        response = await this.boletimRepository.registraCanalApp({
          token: params.token,
          uuid: params.uuid
        })
      } else {
        response = await this.boletimRepository.atualizaCanalApp({
          token: params.token,
          uuid: params.uuid
        })
      }

      if (response.affectedRows <= 0)
        throw new Error("Erro ao registrar o aparelho.")

      return { success: true, message: "Aparelho registrado com sucesso." }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async ultimoConteudo(
    params: ultimoConteudoServiceProps
  ): Promise<defaultResponse> {
    try {
      const content = await this.boletimRepository.ultimoConteudo({
        tipo_id: params.tipo_id
      })

      if (!content)
        throw new Error("Erro ao selecionar o último conteúdo selecionado.")

      return {
        success: true,
        data: content
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async lerBoletimPrivado(
    params: getBoletimLeituraPrivadoServiceProps
  ): Promise<defaultResponse> {
    try {
      const be = await this.boletimRepository.selecionarBoletimLeitura({
        id: params.id
      })

      if (!be) throw new Error("Erro ao selecionar o boletim.")

      const items = await this.boletimRepository.selecionarBoletimItemLeitura({
        idBoletim: params.id
      })

      this.boletimRepository.vizualizacao({
        idBoletim: params.id,
        quantidade: be.vizualizacao + 1
      })

      const isFav = await this.boletimRepository.verificaFavorito({
        idBoletim: params.id,
        idUsuario: params.idusuario
      })

      const isRea = await this.boletimRepository.verificaLeitura({
        idBoletim: params.id,
        idUsuario: params.idusuario
      })

      return {
        success: true,
        data: {
          id: be.id,
          titulo: be.titulo,
          numero: be.numero,
          data: be.data,
          lido: isRea && isRea.count > 0 ? true : false,
          favorito: isFav && isFav.count > 0 ? true : false,
          conteudo: items
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async lerBoletimPublico(
    params: getBoletimLeituraPublicoServiceProps
  ): Promise<defaultResponse> {
    try {
      const be = await this.boletimRepository.selecionarBoletimLeitura({
        id: params.id
      })

      if (!be) throw new Error("Erro ao selecionar o boletim.")

      const items = await this.boletimRepository.selecionarBoletimItemLeitura({
        idBoletim: params.id
      })

      this.boletimRepository.vizualizacao({
        idBoletim: params.id,
        quantidade: be.vizualizacao + 1
      })

      return {
        success: true,
        data: {
          id: be.id,
          titulo: be.titulo,
          numero: be.numero,
          data: be.data,
          conteudo: items
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
