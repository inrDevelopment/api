//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  boletimNovoControllerProps,
  boletimNovoValidation
} from "../schemas/boletimNovo"
import {
  listarBoletimControllerProps,
  listarBoletimValidation
} from "../schemas/listarBoletim"
import BoletimService from "../services/Boletim"
//#endregion Imports

export default class BoletimController {
  constructor(private boletimService: BoletimService) {}

  async novoBoletim(
    params: boletimNovoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimNovoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.novoBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarBoletins(
    params: listarBoletimControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarBoletimValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.listarBoletins(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listForPanel(params: {}): Promise<defaultResponse> {
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

  async markAsReaded(params: {}): Promise<defaultResponse> {
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

  async markAsUnReaded(params: {}): Promise<defaultResponse> {
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

  async favoriteThis(params: {}): Promise<defaultResponse> {
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

  async unfavoriteThis(params: {}): Promise<defaultResponse> {
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

  async approveThis(params: {}): Promise<defaultResponse> {
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

  async publishThis(params: {}): Promise<defaultResponse> {
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
}
