import { Repository } from "../core/Repository"

export default class UserRepository extends Repository {
  async getSalt(params: {
    login: string
  }): Promise<{ idusuario: number; idstatus_cliente: number } | null> {
    try {
      return await this.procedure<{
        idusuario: number
        idstatus_cliente: number
      }>("get_salt", `'${params.login}'`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getConfirmation(params: { email: string; senha: string }): Promise<{
    idcliente: number
    idstatus_cliente: number
    idusuario: number
    nome: string
    idgrupo_site: number
    autorizacao_trabalhista: string
    admin: string
    ultimo_login: Date
    login_antigo: string
    email_antigo: string
  } | null> {
    try {
      return await this.procedure<{
        idcliente: number
        idstatus_cliente: number
        idusuario: number
        nome: string
        idgrupo_site: number
        autorizacao_trabalhista: string
        admin: string
        ultimo_login: Date
        login_antigo: string
        email_antigo: string
      }>("get_user_confirmation", `'${params.email}'`, `'${params.senha}'`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getOldConfirmation(params: { email: string; senha: string }): Promise<{
    idcliente: number
    idstatus_cliente: number
    idusuario: number
    nome: string
    idgrupo_site: number
    autorizacao_trabalhista: string
    admin: string
    ultimo_login: Date
    login_antigo: string
    email_antigo: string
  } | null> {
    try {
      return await this.procedure<{
        idcliente: number
        idstatus_cliente: number
        idusuario: number
        nome: string
        idgrupo_site: number
        autorizacao_trabalhista: string
        admin: string
        ultimo_login: Date
        login_antigo: string
        email_antigo: string
      }>("get_old_user_confirmation", `'${params.email}'`, `'${params.senha}'`)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserName(params: { id: number }): Promise<{ nome: string } | null> {
    try {
      return this.procedure<{ nome: string }>("get_nome_usuario", params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserPainelLogin(params: {
    loginusuario: string
  }): Promise<{ idusuario: number; datacad: string } | null> {
    try {
      return this.procedure<{ idusuario: number; datacad: string }>(
        "get_user_panel_login",
        `'${params.loginusuario}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verificacaoSegurancaPainel(params: {
    login: string
    senha: string
  }): Promise<{
    idusuario: number
    idgrupo: number
    nome: string
    idacesso: number
    datalog: string
    nivel_consultor: number
    consultoria: string
    data_ultimo_acesso: string
  } | null> {
    try {
      return this.procedure<{
        idusuario: number
        idgrupo: number
        nome: string
        idacesso: number
        datalog: string
        nivel_consultor: number
        consultoria: string
        data_ultimo_acesso: string
      }>(
        "verificacao_seguranca_painel",
        `'${params.login}'`,
        `'${params.senha}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getallrecursos(): Promise<
    {
      tipo: string
      nome: string
      icone: string
      tag: string
      url: string
      atributos: string
    }[]
  > {
    try {
      return this.many<{
        tipo: string
        nome: string
        icone: string
        tag: string
        url: string
        atributos: string
      }>("todos_recursos")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getusuariorecursos(params: { idusuario: number }): Promise<
    {
      tipo: string
      nome: string
      icone: string
      tag: string
      url: string
      atributos: string
    }[]
  > {
    try {
      return this.many<{
        tipo: string
        nome: string
        icone: string
        tag: string
        url: string
        atributos: string
      }>("get_usuario_recursos", params.idusuario)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
