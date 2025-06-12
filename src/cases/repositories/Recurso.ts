import { Repository } from "../core/Repository"

export default class RecursoRepository extends Repository {
  async criar(params: {
    nome: string
    icone: string
    url: string
    tag: string
    recurso_tipo_id: number
    ativo: boolean
    atributos: string
    idusuario: number
  }): Promise<any> {
    try {
      return this.procedure(
        "",
        params.nome,
        params.icone,
        params.url,
        params.tag,
        params.recurso_tipo_id,
        params.ativo,
        params.atributos,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async editar(params: {
    id: number
    nome: string
    icone: string
    url: string
    tag: string
    recurso_tipo_id: number
    ativo: boolean
    atributos: string
    idusuario: number
  }): Promise<{
    affectedRows: number
  }> {
    try {
      return this.updateprocedure(
        "",
        params.id,
        params.nome,
        params.icone,
        params.url,
        params.tag,
        params.recurso_tipo_id,
        params.ativo,
        params.atributos,
        params.idusuario
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async selecionar(params: { id: number }): Promise<{
    id: number
    nome: string
    icone: string
    url: string
    tag: string
    recurso_tipo_id: number
    ativo: boolean
    atributos: string
    criadoid: number
    criadonome: string
    criadoem: string
    editadoid: number
    editadonome: string
    editadoem: string
  } | null> {
    try {
      return this.procedure<{
        id: number
        nome: string
        icone: string
        url: string
        tag: string
        recurso_tipo_id: number
        ativo: boolean
        atributos: string
        criadoid: number
        criadonome: string
        criadoem: string
        editadoid: number
        editadonome: string
        editadoem: string
      }>("", params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async excluir(params: { id: number; idusuario: number }): Promise<{
    affectedRows: number
  }> {
    try {
      return this.deleteprocedure("", params.id, params.idusuario)
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
        "",
        params.nome,
        params.url,
        params.tag,
        params.recurso_tipo_id,
        params.ativo,
        params.limite,
        params.pagina
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
      return this.procedure<{ count: number }>(
        "",
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

  async verificaCriarNome(nome: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }

  async verificaEditarNome(nome: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }

  async verificaCriarTag(tag: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }

  async verificaEditarTag(tag: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }

  async verificaCriarUrl(url: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }

  async verificaEditarUrl(url: string): Promise<{ count: number } | any> {
    try {
    } catch (error: any) {}
  }
}
