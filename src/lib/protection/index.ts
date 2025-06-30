import { Request, Response } from "express"
import process from "../protection/core/process"

//#region tipo
type acao = "create" | "read" | "update" | "delete" | "approve" | "publish"
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
type usuario = Usuario
type segurancaParams = {
  recurso: string
  acao: string
}
type meta = Meta
//#endregion tipo

//#region interfaces
interface IUsuario {
  id: number
  nome: string
  email: string
  super?: "S" | "N"
  credenciais?: Record<string, string>
  idcliente?: number
  idgrupo_site?: number
  admin?: string
  autorizacao_trabalhista?: string
}

interface IMetaParams {
  url: string
  date: Date
  method: string
  start: number
}
//#endregion interfaces

//#region classes
class Usuario {
  public readonly id: number
  public readonly nome: string
  public readonly email: string
  private readonly _super?: "S" | "N"
  private readonly _credenciais?: Record<string, string>
  private readonly _idcliente?: number
  private readonly _idgrupo_site?: number
  private readonly _admin?: string
  private readonly _autorizacao_trabalhista?: string

  constructor(private params: IUsuario) {
    this.id = this.params.id
    this.nome = this.params.nome
    this.email = this.params.email
    this._super = this.params.super
    this._credenciais = this.params.credenciais
    this._idcliente = this.params.idcliente
    this._idgrupo_site = this.params.idgrupo_site
    this._admin = this.params.admin
    this._autorizacao_trabalhista = this.params.autorizacao_trabalhista
  }

  public isSuper(): boolean {
    return this._super === "S"
  }

  public isAllowed(params: segurancaParams): boolean {
    if (!this._credenciais) return false
    if (!(params.recurso in this._credenciais)) return false
    return this._credenciais[params.recurso].indexOf(params.acao[0]) >= 0
  }

  get idcliente(): number {
    if (!this._idcliente) throw new Error("propertie undefinied")
    return this._idcliente
  }

  get idgrupo_site(): number {
    if (!this._idgrupo_site) throw new Error("propertie undefinied")
    return this._idgrupo_site
  }

  get admin(): string {
    if (!this._admin) throw new Error("propertie undefinied")
    return this._admin
  }

  get autorizacao_trabalhista(): string {
    if (!this._autorizacao_trabalhista) throw new Error("propertie undefinied")
    return this._autorizacao_trabalhista
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

  finish(): void {
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
  IUsuario,
  Meta,
  meta,
  Niveis,
  nivel,
  params,
  process,
  segurancaParams,
  usuario,
  Usuario
}
