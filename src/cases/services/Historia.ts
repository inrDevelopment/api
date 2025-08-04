import { defaultResponse } from "../core/defaultResponse"
import HistoriaRepository from "../repositories/Historia"
import { commomPaginationServiceProps } from "../schemas/commomPagination"

export default class HistoriaService {
  constructor(private historiaRepository: HistoriaRepository) {}

  public async home(
    params: commomPaginationServiceProps
  ): Promise<defaultResponse> {
    try {
      return { success: false }
    } catch (error: any) {
      return { success: false }
    }
  }
}
