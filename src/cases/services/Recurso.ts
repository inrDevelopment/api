//#region imports
import { defaultResponse } from "../core/defaultResponse"
import RecursoRepository from "../repositories/Recurso"
import { criarRecursoServiceProps } from "../schemas/criarRecurso"
import { editarRecursoServiceProps } from "../schemas/editarRecurso"
import { excluirRecursoServiceProps } from "../schemas/excluirRecurso"
import { listarRecursoServiceProps } from "../schemas/listarRecurso"
import { selecionarRecursoServiceProps } from "../schemas/selecionarRecurso"
//#endregion imports

export default class RecursoService {
  constructor(private recursoRepository: RecursoRepository) {}
  async editarRecurso(
    params: editarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async criarRecurso(
    params: criarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarRecurso(
    params: listarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async selecionarRecurso(
    params: selecionarRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async excluirRecurso(
    params: excluirRecursoServiceProps
  ): Promise<defaultResponse> {
    try {
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
