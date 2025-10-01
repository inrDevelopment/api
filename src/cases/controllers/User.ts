//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import { appAuthControllerProps, appAuthValidation } from "../schemas/appAuth"
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
//#endregion Imports

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

  async appAuth(params: appAuthControllerProps): Promise<defaultResponse> {
    try {
      const validation = await appAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.appAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async desktopAuth(params: appAuthControllerProps): Promise<defaultResponse> {
    try {
      const validation = await appAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.desktopAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoEmailSite(
    params: recuperacaoMailControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoMailValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoEmailSite(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoEmailPainel(
    params: recuperacaoMailControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoMailValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoEmailPainel(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoCelSite(
    params: recuperacaoCelControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoCelValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoCelSite(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recuperacaoCelPainel(
    params: recuperacaoCelControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recuperacaoCelValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recuperacaoCelPainel(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmaRecuperacaoSite(
    params: confirmaRecuperacaoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await confirmaRecuperacaoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.confirmaRecuperacaoSite(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmaRecuperacaoPainel(
    params: confirmaRecuperacaoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await confirmaRecuperacaoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.confirmaRecuperacaoPainel(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
