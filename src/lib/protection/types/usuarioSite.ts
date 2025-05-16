import { usuarioBase } from "./usuarioBase"

export interface IUsuarioSite extends usuarioBase {
  tipo: "site"
  idcliente: number
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string
}

export class UsuarioSite implements IUsuarioSite {
  idusuario: number
  idcliente: number
  tipo: "site" = "site"
  nome: string
  email: string
  idgrupo_site: number
  admin: string
  autorizacao_trabalhista: string

  constructor(data: IUsuarioSite) {
    this.idusuario = data.idusuario
    this.idcliente = data.idcliente
    this.nome = data.nome
    this.email = data.email
    this.idgrupo_site = data.idgrupo_site
    this.admin = data.admin
    this.autorizacao_trabalhista = data.autorizacao_trabalhista
  }
}
