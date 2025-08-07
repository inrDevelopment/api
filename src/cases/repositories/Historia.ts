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

  async listarHistoria(params: {
    limite: number
    pagina: number
  }): Promise<{ id: number; titulo: string; datacad: string }[]> {
    try {
      return await this.many<{ id: number; titulo: string; datacad: string }>(
        "lista_historias",
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async countListarHistoria(): Promise<{ count: number } | null> {
    try {
      return await this.call<{ count: number }>("count_lista_historia")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
