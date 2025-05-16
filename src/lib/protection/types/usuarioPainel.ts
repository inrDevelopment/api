import { usuarioBase } from "./usuarioBase"

export interface IUsuarioPainel extends usuarioBase {
  tipo: "painel"
  recurso: Record<string, string[]>
}

export class UsuarioPainel implements IUsuarioPainel {
  idusuario: number
  nome: string
  email: string
  tipo: "painel" = "painel"
  recurso: Record<string, string[]>

  constructor(data: IUsuarioPainel) {
    this.idusuario = data.idusuario
    this.nome = data.nome
    this.email = data.email
    this.tipo = data.tipo
    this.recurso = data.recurso
  }

  autorizado(recurso: string, acao: string): boolean {
    return this.recurso[recurso].findIndex(i => i === acao) >= 0
  }
}
