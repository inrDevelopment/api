//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  criarRecursoControllerProps,
  criarRecursoValidation
} from "../schemas/criarRecurso"
import {
  editarRecursoControllerProps,
  editarRecursoValidation
} from "../schemas/editarRecurso"
import {
  excluirRecursoControllerProps,
  excluirRecursoValidation
} from "../schemas/excluirRecurso"
import {
  listarRecursoControllerProps,
  listarRecursoValidation
} from "../schemas/listarRecurso"
import {
  selecionarRecursoControllerProps,
  selecionarRecursoValidation
} from "../schemas/selecionarRecurso"
import RecursoService from "../services/Recurso"
//#endregion Imports

export default class RecursoController {
  constructor(private recursoService: RecursoService) {}

  async criarRecurso(
    params: criarRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await criarRecursoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.criarRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async editarRecurso(
    params: editarRecursoControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await editarRecursoValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.recursoService.editarRecurso(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

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
}
