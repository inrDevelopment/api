import { defaultResponse } from "../core/defaultResponse"
import {
  confirmaRecuperacaoControllerProps,
  confirmaRecuperacaoValidation
} from "../schemas/confirmaRecuperacao"
import {
  painelAuthControllerProps,
  painelAuthValidation
} from "../schemas/painelAuth"
import {
  recuperacaoCelControllerProps,
  recuperacaoCelValidation
} from "../schemas/recuperacaoCel"
import {
  recuperacaoMailControllerProps,
  recuperacaoMailValidation
} from "../schemas/recuperacaoEmail"
import {
  siteAuthControllerProps,
  siteAuthValidation
} from "../schemas/siteAuth"
import type UserService from "../services/User"

export default class UserController {
  constructor(private userService: UserService) {}

  async siteAuth(params: siteAuthControllerProps): Promise<defaultResponse> {
    try {
      const validation = await siteAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.siteAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async painelAuth(
    params: painelAuthControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await painelAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.painelAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoEmail(
    params: recuperacaoMailControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoMailValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoEmail(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoCel(
    params: recuperacaoCelControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoCelValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoCel(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmaRecuperacao(
    params: confirmaRecuperacaoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await confirmaRecuperacaoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.confirmaRecuperacao(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
