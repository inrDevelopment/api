import { Repository } from "../core/Repository"
import { transactional } from "../core/transaction"

export default class BoletimRepository extends Repository {
  async novo(params: {
    titulo: string
    numero: number
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
        this.formatDate(params.data),
        params.criado_id
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async tipoBoletimLista(): Promise<{ id: number; nome: number }[]> {
    try {
      return await this.many<{ id: number; nome: number }>(
        "get_boletim_tipo_list"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async tipoConteudoLista(params: {
    idtipoboletim: number
  }): Promise<{ id: number; nome: number }[]> {
    try {
      return await this.many<{ id: number; nome: number }>(
        "get_boletim_conteudo_tipo_list",
        params.idtipoboletim
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
        params.limite * params.pagina
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

  async selecionarBoletim(params: { idBoletim: number }): Promise<{
    id: number
    titulo: string
    numero: number
    boletim_tipo_id: number
    boletim_tipo_nome: string
    data: string
    ativo: number
    favorito: number
    vizualizacao: number
    observacao: string
    criado_id: number
    criado_em: Date
    criado_nome: string
    alterado_id: number
    alterado_em: Date
    alterado_nome: string
    aprovado_id: number
    aprovado_em: Date
    aprovado_nome: string
    aprovado: string
    publicado_id: number
    publicado_em: Date
    publicado_nome: string
    publicado: string
  } | null> {
    try {
      return this.call<{
        id: number
        titulo: string
        numero: number
        boletim_tipo_id: number
        boletim_tipo_nome: string
        data: string
        ativo: number
        favorito: number
        vizualizacao: number
        observacao: string
        criado_id: number
        criado_em: Date
        criado_nome: string
        alterado_id: number
        alterado_em: Date
        alterado_nome: string
        aprovado_id: number
        aprovado_em: Date
        aprovado_nome: string
        aprovado: string
        publicado_id: number
        publicado_em: Date
        publicado_nome: string
        publicado: string
      }>("get_boletim_id", params.idBoletim)
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

  async verificaTokenDesktop(params: {
    uuid: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_registro_desktop",
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

  async getBoletimItems(params: { idBoletim: number }): Promise<
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
      return await this.many<{
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

  excluirItemsBoletim: transactional<
    { idBoletim: number },
    { affectedRows: number }
  > = async (params, conn) => {
    return this.transactionalCommom(
      conn,
      "excluir_items_boletim",
      params.idBoletim
    )
  }

  updateObservacaoBoletim: transactional<
    { idBoletim: number; observacao: string; idUsuario: number },
    { affectedRows: number }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "update_boletim_observacao",
        params.idBoletim,
        `'${params.observacao}'`,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  novoItemBoletim: transactional<
    {
      conteudoTipoId: number
      boletimId: number
      identificador: number
      titulo: string
      conteudo: string | null
      url: string
      ordem: number
    },
    { id: number }
  > = async (params, conn): Promise<{ id: number }> => {
    try {
      return this.transactionalCall(
        conn,
        "novo_item_boletim",
        params.boletimId,
        params.conteudoTipoId,
        params.identificador,
        `'${params.titulo}'`,
        `${
          !params.conteudo || params.conteudo === "" ? "NULL" : params.conteudo
        }`,
        `'${params.url}'`,
        params.ordem
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  aprovar: transactional<
    { idBoletim: number; idUsuario: number },
    { affectedRows: number }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "aprovar_boletim",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  publicar: transactional<
    { idBoletim: number; idUsuario: number },
    { affectedRows: number }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "publicar_boletim",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  excluirBoletim: transactional<
    { idBoletim: number; idUsuario: number },
    { affectedRows: number }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "delete_boletim",
        params.idBoletim,
        params.idUsuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  removeAprovacao: transactional<{ idBoletim: number }> = async (
    params,
    conn
  ) => {
    try {
      return await this.transactionalCommom(
        conn,
        "remove_aprovacao",
        params.idBoletim
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async listarBoletimPainel(params: {
    pagina: number
    limite: number
    data?: string | null | undefined
    numero?: string | null | undefined
    boletimTipo?: number | null | undefined
  }): Promise<
    { id: number; titulo: string; numero: number; tipo: string; data: string }[]
  > {
    try {
      console.log(params.numero)

      return await this.many<{
        id: number
        titulo: string
        numero: number
        tipo: string
        data: string
      }>(
        "listar_boletim_painel",
        `${params.numero ? params.numero : "NULL"}`,
        `${params.boletimTipo ? params.boletimTipo : "NULL"}`,
        `${params.data ? this.zeroDate(params.data) : "NULL"}`,
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async listarBoletimPainelCount(params: {
    data?: string | null | undefined
    numero?: string | null | undefined
    boletimTipo?: number | null | undefined
  }): Promise<{
    count: number
  } | null> {
    try {
      return await this.call<{
        count: number
      }>(
        "listar_boletim_painel_count",
        `${params.numero ? params.numero : "NULL"}`,
        `${params.boletimTipo ? params.boletimTipo : "NULL"}`,
        `${params.data ? this.zeroDate(params.data) : "NULL"}`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
