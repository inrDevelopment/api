import { Repository } from "../core/Repository"
import { transactional } from "../core/transaction"

export default class ConfiguracoesRepository extends Repository {
  async getConfigurationObject(): Promise<{ valor: string } | null> {
    try {
      return this.call<{ valor: string }>("get_configuracao_object")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getBeNumero(): Promise<{ valor: string } | null> {
    try {
      return this.call<{ valor: string }>("get_be_numero")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getClNumero(): Promise<{ valor: string } | null> {
    try {
      return this.call<{ valor: string }>("get_classificador_numero")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateConfigurationObject(valor: {
    E: "S" | "N"
    O: "S" | "N"
    C: "S" | "N"
  }): Promise<{ affectedRows: number }> {
    try {
      return this.commom(
        "update_configuration_object",
        `'${JSON.stringify(valor)}'`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public updateBEvalue: transactional<
    { novoNumeroBE: number },
    {
      affectedRows: number
    }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "update_numero_be",
        params.novoNumeroBE
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public updateCLvalue: transactional<
    { novoNumeroClassificador: number },
    {
      affectedRows: number
    }
  > = async (params, conn) => {
    try {
      return await this.transactionalCommom(
        conn,
        "update_numero_cl",
        params.novoNumeroClassificador
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
