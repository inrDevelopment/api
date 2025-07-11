import { Repository } from "../core/Repository"

export default class RecursoRepository extends Repository {
  async criar(params: {
    recurso_tipo_id: number
    nome: string
    tag: string
    icone: string
    url: string
    ativo: boolean
    idusuario: number
  }): Promise<{ id: number } | null> {
    try {
      return this.call<{ id: number }>(
        "criar_recurso",
        params.recurso_tipo_id,
        params.nome,
        params.tag,
        params.icone,
        params.url,
        params.ativo,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async editar(params: {
    id: number
    recurso_tipo_id: number
    nome: string
    tag: string
    icone: string
    url: string
    ativo: boolean
    idusuario: number
  }): Promise<{
    affectedRows: number
  }> {
    try {
      return this.commom(
        "editar_recurso",
        params.id,
        params.recurso_tipo_id,
        params.nome,
        params.tag,
        params.icone,
        params.url,
        params.ativo,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async selecionar(params: { id: number }): Promise<{
    id: number
    recurso_tipo_id: number
    recurso_tipo_nome: string
    nome: string
    tag: string
    icone: string
    url: string
    ativo: boolean
    criadoid: number
    criadonome: string
    criadoem: string
    editadoid: number
    editadonome: string
    editadoem: string
  } | null> {
    try {
      return this.call<{
        id: number
        recurso_tipo_id: number
        recurso_tipo_nome: string
        nome: string
        tag: string
        icone: string
        url: string
        ativo: boolean
        criadoid: number
        criadonome: string
        criadoem: string
        editadoid: number
        editadonome: string
        editadoem: string
      }>("selecionar_recurso", params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async excluir(params: { id: number; idusuario: number }): Promise<{
    affectedRows: number
  }> {
    try {
      return this.commom("delete_recurso", params.id, params.idusuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async lista(params: {
    nome: string
    url: string
    tag: string
    recurso_tipo_id: number
    ativo: boolean
    limite: number
    pagina: number
  }): Promise<
    {
      id: number
      nome: string
      url: string
      tag: string
      recurso_tipo_id: number
      recurso_tipo_nome: string
      ativo: boolean
    }[]
  > {
    try {
      return this.many(
        "listar_recursos",
        params.nome,
        params.recurso_tipo_id,
        params.tag,
        params.ativo,
        params.limite,
        params.pagina * params.limite
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async count(params: {
    nome: string
    url: string
    tag: string
    recurso_tipo_id: number
    ativo: boolean
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "count_listar_recursos",
        params.nome,
        params.url,
        params.tag,
        params.recurso_tipo_id,
        params.ativo
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaCriarNome(params: {
    nome: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>("verifica_criar_nome", params.nome)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaEditarNome(params: {
    id: number
    nome: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_editar_nome",
        params.id,
        params.nome
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaCriarTag(params: {
    tag: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>("verifica_criar_tag", params.tag)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaEditarTag(params: {
    id: number
    tag: string
  }): Promise<{ count: number } | null> {
    try {
      return this.call<{ count: number }>(
        "verifica_editar_tag",
        params.id,
        params.tag
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaCriarUrl(params: {
    url: string
  }): Promise<{ count: number } | any> {
    try {
      return this.call<{ count: number }>("verifica_criar_url", params.url)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificaEditarUrl(params: {
    id: number
    url: string
  }): Promise<{ count: number } | any> {
    try {
      return this.call<{ count: number }>(
        "verifica_editar_url",
        params.id,
        params.url
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
