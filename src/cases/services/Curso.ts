import fixText from "../../lib/decodeHtmltext"
import { defaultResponse } from "../core/defaultResponse"
import CursoRepository from "../repositories/Curso"
import { commomPaginationServiceProps } from "../schemas/commomPagination"

export default class CursoService {
  constructor(private cursoRepository: CursoRepository) {}

  public async home(
    params: commomPaginationServiceProps
  ): Promise<defaultResponse> {
    try {
      const res = await this.cursoRepository.listaCurso({
        limite: params.limit,
        pagina: params.page
      })

      const data = res.map(i => ({
        id: i.id,
        titulo: fixText(i.titulo),
        datacad: new Date(i.datacad).toLocaleDateString()
      }))
      return { success: true, data }
    } catch (error: any) {
      return { success: false }
    }
  }
}
