//#region imports
import { createHash } from "crypto"
import { sign } from "jsonwebtoken"
import application from "../../config/application"
import { defaultResponse } from "../core/defaultResponse"
import BoletimRepository from "../repositories/Boletim"
import UserRepository from "../repositories/User"
import { favoriteThisServiceProps } from "../schemas/favoriteThis"
import { listarBoletimPrivadoServiceProps } from "../schemas/listarBoletimPrivado"
import { listarBoletimPublicoServiceProps } from "../schemas/listarBoletimPublico"
import { listarFavoritoServiceProps } from "../schemas/listarFavorito"
import { loginLeitorServiceProps } from "../schemas/loginLeitor"
import { markAsReadedServiceProps } from "../schemas/markAsReaded"
import { markAsUnreadedServiceProps } from "../schemas/markAsUnreaded"
import { registerServiceProps } from "../schemas/register"
import { unfavoriteThisServiceProps } from "../schemas/unfavoriteThis"
//#endregion imports

export default class LeitorService {
  constructor(
    private boletimRepository: BoletimRepository,
    private userRepository: UserRepository
  ) {}

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
      const response = await this.boletimRepository.registerMobile({
        userToken: params.token,
        uuid: params.uuid
      })

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

  async login(params: loginLeitorServiceProps): Promise<defaultResponse> {
    try {
      const salt = await this.userRepository.getSalt({
        login: params.login
      })

      if (!salt)
        throw new Error("Não existe nenhum usuário cadastrado com esses dados.")

      if (salt.idstatus_cliente > 2)
        throw new Error(
          "Seu acesso encontra-se desativado. Entre em contato conosco para reativar."
        )

      const hash = createHash("sha1")
      const fullHash = createHash("sha1")

      hash.update(params.senha)
      fullHash.update(`${hash.digest("hex")}${salt.idusuario}`)

      const contentToSearch = fullHash.digest("hex")
      let userConfirmed = null

      userConfirmed = await this.userRepository.getConfirmation({
        email: params.login,
        senha: contentToSearch
      })

      if (!userConfirmed) {
        userConfirmed = await this.userRepository.getOldConfirmation({
          email: params.login,
          senha: contentToSearch
        })
      }

      if (!userConfirmed) throw new Error("A senha informada está incorreta.")

      const token = sign(
        JSON.stringify({
          idcliente: userConfirmed.idcliente,
          idusuario: userConfirmed.idusuario,
          idgrupo_site: userConfirmed.idgrupo_site,
          admin: userConfirmed.admin,
          autorizacao_trabalhista: userConfirmed.autorizacao_trabalhista
        }),
        application.key
      )

      return {
        success: true,
        data: {
          nome: userConfirmed.nome,
          credential: token
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
