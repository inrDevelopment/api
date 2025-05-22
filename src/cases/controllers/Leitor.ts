//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  favoriteThisControllerProps,
  favoriteThisValidation
} from "../schemas/favoriteThis"
import {
  listarBoletimControllerProps,
  listarBoletimValidation
} from "../schemas/listarBoletim"
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
  unfavoriteThisControllerProps,
  unfavoriteThisValidation
} from "../schemas/unfavoriteThis"
import LeitorService from "../services/Leitor"
//#endregion Imports

export default class LeitorController {
  constructor(private leitorService: LeitorService) {}

  async listarBoletins(
    params: listarBoletimControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarBoletimValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.leitorService.listarBoletins(validation.data)
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

  async markAsUnReaded(
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
}
