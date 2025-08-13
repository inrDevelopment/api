import fixText from "../../lib/decodeHtmltext"
import { defaultResponse } from "../core/defaultResponse"
import HistoriaRepository from "../repositories/Historia"
import { commomPaginationServiceProps } from "../schemas/commomPagination"

export default class HistoriaService {
  constructor(private historiaRepository: HistoriaRepository) {}

  public async home(
    params: commomPaginationServiceProps
  ): Promise<defaultResponse> {
    try {
      const results = await this.historiaRepository.listarHistoria({
        limite: params.limit,
        pagina: params.page
      })

      const data = results.map(i => ({
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
