//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  boletimNovoControllerProps,
  boletimNovoValidation
} from "../schemas/boletimNovo"
import {
  editarBoletimControllerProps,
  editarBoletimValidation
} from "../schemas/editarBoletim"
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

  async editarBoletim(
    params: editarBoletimControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await editarBoletimValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.editarBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async selecionarBoletim(
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

  async excluirBoletim(
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

  async listaBoletim(params: {}): Promise<defaultResponse> {
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

  async aprovarBoletim(params: {}): Promise<defaultResponse> {
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

  async publicarBoletim(params: {}): Promise<defaultResponse> {
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
