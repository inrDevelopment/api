//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  adicionarItemBoletimControllerProps,
  adicionarItemBoletimValidation
} from "../schemas/adicionarItemBoletim"
import {
  boletimAprovarControllerProps,
  boletimAprovarValidation
} from "../schemas/boletimAprovar"
import {
  boletimExcluirControllerProps,
  boletimExcluirValidation
} from "../schemas/boletimExcluir"
import {
  boletimNovoControllerProps,
  boletimNovoValidation
} from "../schemas/boletimNovo"
import {
  boletimPublicarControllerProps,
  boletimPublicarValidation
} from "../schemas/boletimPublicar"
import {
  boletimSelecionarControllerProps,
  boletimSelecionarValidation
} from "../schemas/boletimSelecionar"
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
    params: boletimSelecionarControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimSelecionarValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.selecionarBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async excluirBoletim(
    params: boletimExcluirControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimExcluirValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.excluirBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listaBoletim(params: any): Promise<defaultResponse> {
    try {
      // const validation = await listarBoletimValidation.safeParseAsync(params)

      // if (!validation.success)
      //   throw new Error(validation.error.issues[0].message)

      // return await this.boletimService.listaBoletim(validation.data)

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async aprovarBoletim(
    params: boletimAprovarControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimAprovarValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.aprovarBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async publicarBoletim(
    params: boletimPublicarControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await boletimPublicarValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.publicarBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async adicionarItemBoletim(
    params: adicionarItemBoletimControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await adicionarItemBoletimValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.boletimService.adicionarItemBoletim(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
