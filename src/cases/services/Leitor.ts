import { defaultResponse } from "../core/defaultResponse"
import BoletimRepository from "../repositories/Boletim"
import { favoriteThisServiceProps } from "../schemas/favoriteThis"
import { listarBoletimServiceProps } from "../schemas/listarBoletim"
import { listarFavoritoServiceProps } from "../schemas/listarFavorito"
import { loginLeitorServiceProps } from "../schemas/loginLeitor"
import { markAsReadedServiceProps } from "../schemas/markAsReaded"
import { markAsUnreadedServiceProps } from "../schemas/markAsUnreaded"
import { registerServiceProps } from "../schemas/register"
import { unfavoriteThisServiceProps } from "../schemas/unfavoriteThis"

export default class LeitorService {
  constructor(private boletimRepository: BoletimRepository) {}

  async listarBoletins(
    params: listarBoletimServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listarBoletim({
        searchText: params.titulo,
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data,
        limite: params.limite,
        pagina: params.pagina * params.limite
      })

      const res = await this.boletimRepository.listarBoletimCount({
        searchText: params.titulo,
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data
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
      const res = await this.boletimRepository.markAsReaded(params)

      if (res) throw new Error("Erro ao marcar boletim como lido.")

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

      if (res) throw new Error("Erro ao marcar boletim como não lido.")

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
      return {
        success: false
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
      return {
        success: false
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
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async register(params: registerServiceProps): Promise<defaultResponse> {
    try {
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async login(params: loginLeitorServiceProps): Promise<defaultResponse> {
    try {
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
