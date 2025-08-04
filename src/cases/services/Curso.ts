import { defaultResponse } from "../core/defaultResponse"
import CursoRepository from "../repositories/Curso"
import { commomPaginationServiceProps } from "../schemas/commomPagination"

export default class CursoService {
  constructor(private cursoRepository: CursoRepository) {}

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
