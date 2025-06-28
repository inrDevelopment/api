//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  favoriteThisControllerProps,
  favoriteThisValidation
} from "../schemas/favoriteThis"
import {
  getBoletimLeituraPrivadoControllerProps,
  getBoletimLeituraPrivadoValidation
} from "../schemas/getBoletimLeituraPrivado"
import {
  getBoletimLeituraPublicoControllerProps,
  getBoletimLeituraPublicoValidation
} from "../schemas/getBoletimLeituraPublico"
import {
  listarBoletimPrivadoControllerProps,
  listarBoletimPrivadoValidation
} from "../schemas/listarBoletimPrivado"
import {
  listarBoletimPublicoControllerProps,
  listarBoletimPublicoValidation
} from "../schemas/listarBoletimPublico"
import {
  listarFavoritoControllerProps,
  listarFavoritoValidation
} from "../schemas/listarFavorito"
import {
  loginLeitorControllerProps,
  loginLeitorValidation
} from "../schemas/loginLeitor"
import {
  markAsReadedControllerProps,
  markAsReadedValidation
} from "../schemas/markAsReaded"
import {
  markAsUnreadedControllerProps,
  markAsUnreadedValidation
} from "../schemas/markAsUnreaded"
import {
  registerControllerProps,
  registerValidation
} from "../schemas/register"
import {
  ultimoConteudoControllerProps,
  ultimoConteudoValidation
} from "../schemas/ultimoConteudo"
import {
  unfavoriteThisControllerProps,
  unfavoriteThisValidation
} from "../schemas/unfavoriteThis"
import LeitorService from "../services/Leitor"
//#endregion Imports

export default class LeitorController {
  constructor(private leitorService: LeitorService) {}

  async listarBoletinsPrivado(
    params: listarBoletimPrivadoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarBoletimPrivadoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.listarBoletinsPrivado(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarBoletinsPublico(
    params: listarBoletimPublicoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarBoletimPublicoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.listarBoletinsPublico(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async markAsReaded(
    params: markAsReadedControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await markAsReadedValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.markAsReaded(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async markAsUnreaded(
    params: markAsUnreadedControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await markAsUnreadedValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.markAsUnReaded(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async favoriteThis(
    params: favoriteThisControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await favoriteThisValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.favoriteThis(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async unfavoriteThis(
    params: unfavoriteThisControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await unfavoriteThisValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.unfavoriteThis(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarFavoritos(
    params: listarFavoritoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarFavoritoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.listarFavoritos(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async ultimoConteudo(
    params: ultimoConteudoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await ultimoConteudoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.ultimoConteudo(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async register(params: registerControllerProps): Promise<defaultResponse> {
    try {
      const validation = await registerValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.register(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async login(params: loginLeitorControllerProps): Promise<defaultResponse> {
    try {
      const validation = await loginLeitorValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.login(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async lerBoletimPrivado(
    params: getBoletimLeituraPrivadoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation =
        await getBoletimLeituraPrivadoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.lerBoletimPrivado(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async lerBoletimPublico(
    params: getBoletimLeituraPublicoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation =
        await getBoletimLeituraPublicoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.lerBoletimPublico(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
