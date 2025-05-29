import { Request, Response } from "express"
import { process as mobileProccess } from "./core/mobile"
import { process as painelProccess } from "./core/painel"
import { process as siteProccess } from "./core/site"

type acao = "criar" | "ler" | "editar" | "excluir" | "aprovar" | "publicar"
type nivel = 0 | 1 | 2
type tipo = "painel" | "site" | "mobile"
type defaultResponse = { success: boolean; data?: any; message?: string }
type handle = (req: Request, res: Response<defaultResponse>) => Promise<void>

type configuracao = {
  acao: acao
  recurso: string
  nivel: nivel
}

enum Niveis {
  "nenhum",
  "medio",
  "alto"
}

type baseUser = {
  id: number
  nome: string
  email: string
  tipo: tipo
}

type params = {
  handle: handle
  configuracao: configuracao
}

interface IUsuarioPainel extends baseUser {
  tipo: "painel"
  recurso: Record<string, string[]>
}

interface IUsuarioSite extends baseUser {
  tipo: "site"
  idcliente: number
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string
}

interface IUsuarioMobile extends baseUser {
  tipo: "mobile"
  idcliente: number
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string
}

class UsuarioPainel {
  id: number
  email: string
  nome: string
  recurso: Record<string, string[]>
  tipo: "painel" = "painel"

  constructor(data: IUsuarioPainel) {
    this.id = data.id
    this.email = data.email
    this.nome = data.nome
    this.recurso = data.recurso
  }

  autorizado(recurso: string, acao: string): boolean {
    return this.recurso[recurso].findIndex(i => i === acao) >= 0
  }
}

class UsuarioSite {
  id: number
  idcliente: number
  tipo: "site" = "site"
  nome: string
  email: string
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string

  constructor(data: IUsuarioSite) {
    this.id = data.id
    this.idcliente = data.idcliente
    this.nome = data.nome
    this.email = data.email
    this.idgrupo_site = data.idgrupo_site
    this.admin = data.admin
    this.autorizacao_trabalhista = data.autorizacao_trabalhista
  }
}

class UsuarioMobile {
  id: number
  idcliente: number
  tipo: "mobile" = "mobile"
  nome: string
  email: string
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string

  constructor(data: IUsuarioMobile) {
    this.id = data.id
    this.idcliente = data.idcliente
    this.nome = data.nome
    this.email = data.email
    this.idgrupo_site = data.idgrupo_site
    this.admin = data.admin
    this.autorizacao_trabalhista = data.autorizacao_trabalhista
  }
}

type usuario = UsuarioPainel | UsuarioSite | UsuarioMobile

export {
  acao,
  baseUser,
  configuracao,
  defaultResponse,
  handle,
  IUsuarioMobile,
  IUsuarioPainel,
  IUsuarioSite,
  mobileProccess,
  Niveis,
  nivel,
  painelProccess,
  params,
  siteProccess,
  tipo,
  usuario,
  UsuarioMobile,
  UsuarioPainel,
  UsuarioSite
}
