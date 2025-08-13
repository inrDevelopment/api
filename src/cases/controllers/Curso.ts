import { defaultResponse } from "../core/defaultResponse"
import {
  commomPaginationControllerProps,
  commomPaginationValidation
} from "../schemas/commomPagination"
import CursoService from "../services/Curso"

export default class CursoController {
  constructor(private cursoService: CursoService) {}

  public async home(
    params: commomPaginationControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await commomPaginationValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.cursoService.home(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
