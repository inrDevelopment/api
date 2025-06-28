import { Request, Response } from "express"

//#region tipo
type acao = "criar" | "ler" | "editar" | "excluir" | "aprovar" | "publicar"
type nivel = 0 | 1 | 2
enum Niveis {
  "nenhum",
  "medio",
  "alto"
}
type handle = (req: Request, res: Response<defaultResponse>) => Promise<void>
type defaultResponse<T = any> = {
  success: boolean
  data?: T
  message?: string
}
type configuracao = {
  acao: acao
  recurso: string
  nivel: nivel
}
type params = {
  handle: handle
  configuracao: configuracao
}
type usuario = UsuarioInterno | UsuarioExterno
type segurancaParams = {
  recurso: string
  acao: string
}
type meta = Meta
//#endregion tipo

//#region interfaces
interface IUsuarioBase {
  id: number
  nome: string
  email: string
}

interface IUsuarioInterno extends IUsuarioBase {
  super: "S" | "N"
  credenciais: Record<string, string[]>
}

interface IUsuarioExterno extends IUsuarioBase {
  idcliente: number
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string
}

interface IMetaParams {
  url: string
  date: Date
  method: string
  start: number
}
//#endregion interfaces

//#region classes
class UsuarioInterno {
  public id: number
  public nome: string
  public email: string
  private credenciais: Record<string, string[]>

  constructor(private params: IUsuarioInterno) {
    this.id = this.params.id
    this.nome = this.params.nome
    this.email = this.params.email
    this.credenciais = this.params.credenciais
  }

  public seguranca(params: segurancaParams): boolean {
    if (!(params.recurso in this.credenciais)) return false
    return this.credenciais[params.recurso].indexOf(params.acao) >= 0
  }
}

class UsuarioExterno {
  id: number
  nome: string
  email: string
  idcliente: number
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string

  constructor(private params: IUsuarioExterno) {
    this.id = this.params.id
    this.nome = this.params.nome
    this.email = this.params.email
    this.idcliente = this.params.idcliente
    this.idgrupo_site = this.params.idgrupo_site
    this.admin = this.params.admin
    this.autorizacao_trabalhista = this.params.autorizacao_trabalhista
  }
}

class Meta {
  private url: string
  private date: Date
  private method: string
  private start: number
  private end: number
  private time: string

  constructor(private params: IMetaParams) {
    this.url = params.url
    this.date = this.params.date
    this.method = this.params.method
    this.start = this.params.start
    this.end = 0
    this.time = ""
  }

  finish() {
    this.end = new Date().getTime()
    this.time = `${this.end - this.start}ms`
  }

  log(): void {
    console.log(
      `URL: ${this.url.toLowerCase()} | METHOD: ${this.method.toLowerCase()} | TIME: ${
        this.time
      }`
    )
  }
}
//#endregion classes

export {
  acao,
  configuracao,
  defaultResponse,
  handle,
  IUsuarioBase,
  IUsuarioExterno,
  IUsuarioInterno,
  Meta,
  meta,
  Niveis,
  nivel,
  params,
  segurancaParams,
  usuario,
  UsuarioExterno,
  UsuarioInterno
}
