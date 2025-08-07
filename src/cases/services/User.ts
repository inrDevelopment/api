//#region Imports
import { createHash } from "crypto"
import jwt, { sign } from "jsonwebtoken"
import md5 from "md5"
import application from "../../config/application"
import { defaultResponse } from "../core/defaultResponse"
import BoletimRepository from "../repositories/Boletim"
import type UserRepository from "../repositories/User"
import { appAuthServiceProps } from "../schemas/appAuth"
import { confirmaRecuperacaoServiceProps } from "../schemas/confirmaRecuperacao"
import { painelAuthServiceProps } from "../schemas/painelAuth"
import { recuperacaoCelServiceProps } from "../schemas/recuperacaoCel"
import { recuperacaoMailServiceProps } from "../schemas/recuperacaoEmail"
import type { siteAuthServiceProps } from "../schemas/siteAuth"
//#endregion Imports

export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private boletimRepository: BoletimRepository
  ) {}

  //#region site
  async siteAuth(params: siteAuthServiceProps): Promise<defaultResponse> {
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

  async recuperacaoEmailSite(params: {}): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoCelSite(params: any): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmaRecuperacaoSite(
    params: confirmaRecuperacaoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  //#endregion site

  //#region app
  async appAuth(params: appAuthServiceProps): Promise<defaultResponse> {
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

      const verificacao = await this.boletimRepository.verificaToken({
        uuid: params.uuid
      })

      if (verificacao && verificacao.count > 0) {
        await this.userRepository.vinculaUsuario({
          uuid: params.uuid,
          idusuario: userConfirmed.idusuario
        })
      }

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
  //#endregion app

  //#region painel
  async painelAuth(params: painelAuthServiceProps): Promise<defaultResponse> {
    try {
      const userSalt = await this.userRepository.getUserPainelLogin({
        loginusuario: params.login
      })

      if (!userSalt) {
        throw new Error("Nenhum usuário encontrado com esse login.")
      }

      let preparedPassword = ""

      try {
        preparedPassword = md5(
          `${md5(params.senha)}${userSalt.idusuario}${userSalt.datacad}`
        )
      } catch (error) {
        throw new Error("Erro ao tentar processar dados do usuário para login.")
      }

      const userSecurity = await this.userRepository.verificacaoSegurancaPainel(
        { login: params.login, senha: preparedPassword }
      )

      if (!userSecurity)
        throw new Error(
          "Não existe nenhum usuário cadastrado com esse login e senha."
        )

      let credential: Record<string, string> = {}
      let settings: Record<
        string,
        { nome: string; icone: string; url: string }[]
      > = {}

      credential.idusuario = `${userSalt.idusuario}`
      credential.nome = `${userSecurity.nome}`
      credential.super = `${userSecurity.super}`

      if (userSecurity.super === "S") {
        const allContent = await this.userRepository.getallrecursos()

        for (let i = 0; i < allContent.length; i++) {
          credential[allContent[i].tag as keyof typeof credential] = "crudap"

          if (!settings[allContent[i].tipo as keyof typeof settings]) {
            settings[allContent[i].tipo as keyof typeof settings] = []
          }

          settings[allContent[i].tipo as keyof typeof settings].push({
            icone: allContent[i].icone,
            nome: allContent[i].nome,
            url: allContent[i].url
          })
        }
      } else {
        const userContent = await this.userRepository.getusuariorecursos({
          idusuario: userSecurity.idusuario
        })

        for (let i = 0; i < userContent.length; i++) {
          credential[userContent[i].tag as keyof typeof credential] =
            userContent[i].keycode

          if (!settings[userContent[i].tipo as keyof typeof settings]) {
            settings[userContent[i].tipo as keyof typeof settings] = []
          }

          settings[userContent[i].tipo as keyof typeof settings].push({
            icone: userContent[i].icone,
            nome: userContent[i].nome,
            url: userContent[i].url
          })
        }
      }

      const content = { key: JSON.stringify(credential) }
      const expires = params.keep ? { expiresIn: "60d" } : { expiresIn: "8h" }
      const token = jwt.sign(content, application.key, expires)

      return {
        success: true,
        data: {
          nome: userSecurity.nome,
          idgrupo: userSecurity.idgrupo,
          idacesso: userSecurity.idacesso,
          nivel_consultor: userSecurity.nivel_consultor,
          consultoria: userSecurity.consultoria,
          data_ultimo_acesso: userSecurity.data_ultimo_acesso,
          credencial: token,
          configuracoes: settings,
          foto: userSecurity.foto
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoEmailPainel(
    params: recuperacaoMailServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoCelPainel(
    params: recuperacaoCelServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmaRecuperacaoPainel(
    params: confirmaRecuperacaoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  //#endregion painel
}
