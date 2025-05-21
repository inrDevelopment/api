import { Repository } from "../core/Repository"

export default class BoletimRepository extends Repository {
  async novo(params: {
    titulo: string
    numero: number
    tipo: number
    data: Date
    criado_id: number
  }): Promise<{ boletim_id: number } | null> {
    try {
      return this.procedure<{ boletim_id: number }>(
        "criar_boletim",
        params.titulo,
        params.numero,
        params.tipo,
        params.data,
        params.criado_id
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listarBoletim(params: {
    searchText: string
    tipo_id: number
    data_boletim: Date
    limite: number
    pagina: number
  }): Promise<
    {
      id: number
      titulo: string
      data: Date
      numero: number
      lido: string
      favorito: string
    }[]
  > {
    try {
      return await this.many<{
        id: number
        titulo: string
        data: Date
        numero: number
        lido: string
        favorito: string
      }>(
        "listar_boletim",
        params.searchText,
        params.tipo_id,
        params.data_boletim,
        params.limite,
        params.pagina
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listarBoletimCount(params: {
    searchText: string
    tipo_id: number
    data_boletim: Date
  }): Promise<{
    count: number
  } | null> {
    try {
      return await this.procedure<{
        count: number
      }>(
        "listar_boletim_count",
        params.searchText,
        params.tipo_id,
        params.data_boletim
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
