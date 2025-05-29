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
    idUsuario: number
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
        "listar_boletim_painel",
        params.idUsuario,
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
        "listar_boletim_painel_count",
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
  }): Promise<{ affectedRows: number }> {
    try {
      return await this.updateprocedure(
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
  }): Promise<{ affectedRows: number }> {
    try {
      return await this.updateprocedure(
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

  async deleteBoletim(params: {
    id: number
    idusuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure("delete_boletim", params.id, params.idusuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async selecionarBoletim(params: { idBoletim: number }): Promise<{
    id: number
    titulo: string
    numero: string
    data: string
    ativo: boolean
    favorito: number
    vizualizacao: number
    criado_em: string
    criado_id: number
    nome_criado: string
    alterado_em: string
    alterado_id: number
    nome_alterado: string
    aprovado: string
    aprovado_em: string
    aprovado_id: number
    nome_aprovado: string
    publicado: string
    publicado_em: string
    publicado_id: number
    nome_publicado: string
  } | null> {
    try {
      return this.procedure<{
        id: number
        titulo: string
        numero: string
        data: string
        ativo: boolean
        favorito: number
        vizualizacao: number
        criado_em: string
        criado_id: number
        nome_criado: string
        alterado_em: string
        alterado_id: number
        nome_alterado: string
        aprovado: string
        aprovado_em: string
        aprovado_id: number
        nome_aprovado: string
        publicado: string
        publicado_em: string
        publicado_id: number
        nome_publicado: string
      }>("select_boletim", params.idBoletim)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async selecionarBoletimitems(params: { idBoletim: number }): Promise<
    {
      id: number
      conteudo_tipo_id: number
      conteudo_tipo: string
      titulo: string
      url: string
      conteudo: string
      ordem: number
    }[]
  > {
    try {
      return this.many<{
        id: number
        conteudo_tipo_id: number
        conteudo_tipo: string
        titulo: string
        url: string
        conteudo: string
        ordem: number
      }>("get_boletim_conteudo", params.idBoletim)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async aprovarBoletim(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "aprovar_boletim",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async publicarBoletim(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "publicar_boletim",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async favoriteThis(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "marcar_favorito",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async unfavoriteThis(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "remover_favorito",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async registerMobile(params: {
    uuid: string
    userToken: string
  }): Promise<{ affectedRows: number }> {
    try {
      return this.updateprocedure(
        "subscribe_mobile_chanell",
        params.uuid,
        params.userToken
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
