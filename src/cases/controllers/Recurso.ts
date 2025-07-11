//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  excluirRecursoControllerProps,
  excluirRecursoValidation
} from "../schemas/excluirRecurso"
import {
  listarRecursoControllerProps,
  listarRecursoValidation
} from "../schemas/listarRecurso"
import {
  salvarRecursoControllerProps,
  salvarRecursoValidation
} from "../schemas/salvarRecurso"
import {
  selecionarRecursoControllerProps,
  selecionarRecursoValidation
} from "../schemas/selecionarRecurso"
import RecursoService from "../services/Recurso"
//#endregion Imports

export default class RecursoController {
  constructor(private recursoService: RecursoService) {}

  async listarRecurso(
    params: listarRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await listarRecursoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.listarRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async selecionarRecurso(
    params: selecionarRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await selecionarRecursoValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.selecionarRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async excluirRecurso(
    params: excluirRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await excluirRecursoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.excluirRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async salvarRecurso(
    params: salvarRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await salvarRecursoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.salvarRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
