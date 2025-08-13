import { defaultResponse } from "../core/defaultResponse"
import {
  commomPaginationControllerProps,
  commomPaginationValidation
} from "../schemas/commomPagination"
import HistoriaService from "../services/Historia"

export default class HistoriaController {
  constructor(private historiaService: HistoriaService) {}

  public async home(
    params: commomPaginationControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await commomPaginationValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.historiaService.home(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
