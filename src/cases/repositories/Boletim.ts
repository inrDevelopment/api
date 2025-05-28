import { Repository } from "../core/Repository"

export default class BoletimRepository extends Repository {
  async novo(params: {
    titulo: string
    numero?: number
    tipo: number
    data: Date
    criado_id: number
  }): Promise<{ boletim_id: number } | null> {
    try {
      return this.procedure<{ boletim_id: number }>(
        "novo_boletim",
        `'${params.titulo}'`,
        params.numero ?? "NULL",
        params.tipo,
        `'${this.formatDate(params.data)}'`,
        params.criado_id
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async dataUpdate(params: {
    idboletim: number
    dataBoletim: Date
    idusuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "update_data_be",
        params.idboletim,
        this.formatDate(params.dataBoletim),
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async dataAndTitleUpdate(params: {
    title: string
    idboletim: number
    dataBoletim: Date
    idusuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "update_data_title_be",
        params.idboletim,
        params.title,
        this.formatDate(params.dataBoletim),
        params.idusuario
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

  async markAsReaded(params: {
    idboletim: number
    idusuario: number
  }): Promise<{ id: number } | null> {
    try {
      return await this.procedure<{ id: number }>(
        "marca_leitura",
        params.idboletim,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async markAsUnreaded(params: {
    idboletim: number
    idusuario: number
  }): Promise<{ id: number } | null> {
    try {
      return await this.procedure<{ id: number }>(
        "remove_leitura",
        params.idboletim,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async canUpdate(params: {
    idboletim: number
  }): Promise<{ id: number; boletim_tipo_id: number } | null> {
    try {
      return await this.procedure<{ id: number; boletim_tipo_id: number }>(
        "can_update_be",
        params.idboletim
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
