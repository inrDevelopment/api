import { Repository } from "../core/Repository"

export default class HistoriaRepository extends Repository {
  async getById(params: { id: number }): Promise<{ conteudo: string } | null> {
    try {
      return await this.call<{ conteudo: string }>(
        "get_historia_by_id",
        `'${params.id}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
