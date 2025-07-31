//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  boletimNovoControllerProps,
  boletimNovoValidation
} from "../schemas/boletimNovo"
import {
  getBoletimByIdControllerProps,
  getBoletimByIdValidation
} from "../schemas/getBoletimById"
import {
  getTipoConteudoControllerProps,
  getTipoConteudoValidation
} from "../schemas/getById"
import {
  getConteudoControllerProps,
  getConteudoValidation
} from "../schemas/getConteudo"
import {
  saveBoletimConteudoControllerProps,
  saveBoletimConteudoValidation
} from "../schemas/saveBoletimConteudo"
import {
  salvarBoletimObservacaoControllerProps,
  salvarBoletimObservacaoValidation
} from "../schemas/saveBoletimObservacao"
import BoletimService from "../services/Boletim"
//#endregion Imports

export default class BoletimController {
  constructor(private boletimService: BoletimService) {}

  public async start(
    params: boletimNovoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimNovoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.start(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async tipo(): Promise<defaultResponse> {
    try {
      return await this.boletimService.tipo()
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async conteudoTipo(
    params: getTipoConteudoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await getTipoConteudoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.conteudoTipo(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async select(
    params: getBoletimByIdControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await getBoletimByIdValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.select(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async saveConteudo(
    params: saveBoletimConteudoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await saveBoletimConteudoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.saveConteudo(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async getConteudo(
    params: getConteudoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await getConteudoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.getConteudo(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async saveObservacao(
    params: salvarBoletimObservacaoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await salvarBoletimObservacaoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.saveObservacao(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
