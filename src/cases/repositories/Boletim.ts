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
      return this.call<{ boletim_id: number }>(
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
      return this.commom(
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
      return this.commom(
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
    numero: string
    tipo_id: number[] | null
    data_boletim: string
    limite: number
    pagina: number
  }): Promise<
    {
      id: number
      titulo: string
      data: Date
      numero: number
      boletim_tipo_id: number
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
        boletim_tipo_id: number
        lido: string
        favorito: string
      }>(
        "listar_boletim",
        params.idUsuario,
        params.numero,
        `'${params.tipo_id ? params.tipo_id.join(",") : null}'`,
        this.zeroDate(params.data_boletim),
        this.finalDate(params.data_boletim),
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listarBoletimPublico(params: {
    numero: string
    tipo_id: number[] | null
    data_boletim: string
    limite: number
    pagina: number
  }): Promise<
    {
      id: number
      titulo: string
      data: Date
      numero: number
      boletim_tipo_id: number
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
        boletim_tipo_id: number
        lido: string
        favorito: string
      }>(
        "listar_boletim_publico",
        params.numero,
        `'${params.tipo_id ? params.tipo_id.join(",") : null}'`,
        this.zeroDate(params.data_boletim),
        this.finalDate(params.data_boletim),
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listarBoletimCount(params: {
    numero: string
    tipo_id: number[] | null
    data_boletim: string
  }): Promise<{
    count: number
  } | null> {
    try {
      return await this.call<{
        count: number
      }>(
        "listar_boletim_count",
        params.numero,
        `'${params.tipo_id ? params.tipo_id.join(",") : null}'`,
        this.zeroDate(params.data_boletim),
        this.finalDate(params.data_boletim)
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
      return await this.commom(
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
      return await this.commom(
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
      return await this.call<{ id: number; boletim_tipo_id: number }>(
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
      return this.commom("delete_boletim", params.id, params.idusuario)
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
      return this.call<{
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
      identificador: number
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
        identificador: number
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
      return this.commom("aprovar_boletim", params.idBoletim, params.idUsuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async publicarBoletim(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom("publicar_boletim", params.idBoletim, params.idUsuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async favoriteThis(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom("marcar_favorito", params.idBoletim, params.idUsuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async unfavoriteThis(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom("remover_favorito", params.idBoletim, params.idUsuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async novoItemBoletim(params: {
    conteudoTipoId: number
    boletimId: number
    identificador: number
    titulo: string
    conteudo: string | null
    url: string
    ordem: number
  }): Promise<{ id: number } | null> {
    try {
      return this.call<{ id: number }>(
        "novo_item_boletim",
        params.conteudoTipoId,
        params.boletimId,
        params.identificador,
        `'${params.titulo}'`,
        `${params.conteudo ?? "NULL"}`,
        `'${params.url}'`,
        params.ordem
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaMarcacaoLeitura(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_marcacao_leitura",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaFavorito(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_favorito",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaLeitura(params: {
    idBoletim: number
    idUsuario: number
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_leitura",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listaFavoritos(params: {
    idUsuario: number
    numero: string | null
    tipo_id: number[] | null
    data_boletim: string | null
    limite: number
    pagina: number
  }): Promise<
    {
      id: number
      titulo: string
      data: Date
      numero: number
      boletim_tipo_id: number
      lido: string
    }[]
  > {
    try {
      return this.many<{
        id: number
        titulo: string
        data: Date
        numero: number
        boletim_tipo_id: number
        lido: string
      }>(
        "listar_favoritos",
        params.idUsuario,
        params.numero ?? "NULL",
        params.tipo_id ? `'${params.tipo_id.join(",")}'` : "NULL",
        params.data_boletim ? this.zeroDate(params.data_boletim) : "NULL",
        params.data_boletim ? this.finalDate(params.data_boletim) : "NULL",
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listaFavoritosCount(params: {
    idUsuario: number
    numero: string | null
    tipo_id: number[] | null
    data_boletim: string | null
  }): Promise<{
    count: number
  } | null> {
    try {
      return this.call<{
        count: number
      }>(
        "listar_favoritos_count",
        params.idUsuario,
        params.numero ?? "NULL",
        params.tipo_id ? `'${params.tipo_id.join(",")}'` : "NULL",
        params.data_boletim ? this.zeroDate(params.data_boletim) : "NULL",
        params.data_boletim ? this.finalDate(params.data_boletim) : "NULL"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async ultimoConteudo(params: { tipo_id: number }): Promise<{
    id: number
    titulo: string
    data: string
    numero: string
  } | null> {
    try {
      return this.call<{
        id: number
        titulo: string
        data: string
        numero: string
      }>("ultimo_conteudo", params.tipo_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async validaItem(params: {
    idItem: number
    idBoletim: number
    conteudoTipoId: number
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "validar_item_boletim",
        params.idItem,
        params.idBoletim,
        params.conteudoTipoId
      )
    } catch (error: any) {
      throw new Error(error.mensagem)
    }
  }

  async validaEdicaoItem(params: {
    idItem: number
    conteudoTipoId: number
    boletimId: number
    identificador: number
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "validar_edicao_boletim_item",
        params.idItem,
        params.conteudoTipoId,
        params.boletimId,
        params.identificador
      )
    } catch (error: any) {
      throw new Error(error.mensagem)
    }
  }

  async editarItemBoletim(params: {
    id: number
    conteudoTipoId: number
    boletimId: number
    identificador: number
    titulo: string
    conteudo: string | null
    url: string
    ordem: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom(
        "editar_item_boletim",
        params.id,
        params.conteudoTipoId,
        params.boletimId,
        params.identificador,
        `'${params.titulo}'`,
        `${params.conteudo ?? "NULL"}`,
        `'${params.url}'`,
        params.ordem
      )
    } catch (error: any) {
      throw new Error(error.mensagem)
    }
  }

  async excluirBoletimItem(params: {
    idBoletimItem: number
  }): Promise<{ affectedRows: number } | null> {
    try {
      return this.commom("excluir_boletim_item", params.idBoletimItem)
    } catch (error: any) {
      throw new Error(error.mensagem)
    }
  }

  async selecionarBoletimLeitura(params: { id: number }): Promise<{
    id: number
    titulo: string
    numero: string
    data: string
    vizualizacao: number
  } | null> {
    try {
      return this.call<{
        id: number
        titulo: string
        numero: string
        data: string
        vizualizacao: number
      }>("selecionar_boletim_leitura", params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async selecionarBoletimItemLeitura(params: { idBoletim: number }): Promise<
    {
      id: number
      conteudo_tipo_id: number
      nome: string
      titulo: string
      url: string
      conteudo: string
    }[]
  > {
    try {
      return this.many<{
        id: number
        conteudo_tipo_id: number
        nome: string
        titulo: string
        url: string
        conteudo: string
      }>("selecionar_boletim_item_leitura", params.idBoletim)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async vizualizacao(params: {
    idBoletim: number
    quantidade: number
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom(
        "atualiza_leitura",
        params.idBoletim,
        params.quantidade
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaToken(params: {
    uuid: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_registro",
        `'${params.uuid}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async registraCanalApp(params: {
    uuid: string
    token: string
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom(
        "registra_canal_app",
        `'${params.uuid}'`,
        `'${params.token}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async atualizaCanalApp(params: {
    uuid: string
    token: string
  }): Promise<{ affectedRows: number }> {
    try {
      return await this.commom(
        "atualiza_canal_app",
        `'${params.uuid}'`,
        `'${params.token}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
