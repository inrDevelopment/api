import { Repository } from "../core/Repository"

export default class ConfiguracoesRepository extends Repository {
  async hasBoletimblock(): Promise<{ valor: string } | null> {
    try {
      return await this.procedure<{ valor: string }>("has_be_block")
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async updateBlock(params: {
    value: "S" | "N"
  }): Promise<{ updated: number } | null> {
    try {
      return await this.procedure<{ updated: number }>(
        "editar_be_block",
        params.value
      )
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async numeroBoletim(): Promise<{ valor: number } | null> {
    try {
      return await this.procedure<{ valor: number }>("get_be_numero")
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async numeroClassificador(): Promise<{ valor: number } | null> {
    try {
      return await this.procedure<{ valor: number }>("get_classificador_numero")
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async numeroIeptb(): Promise<{ valor: number } | null> {
    try {
      return await this.procedure<{ valor: number }>("get_ieptb_numero")
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async urlPrefixo(): Promise<{ valor: number } | null> {
    try {
      return await this.procedure<{ valor: number }>("get_url_prefixo")
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async updateBoletimValue(value: number): Promise<{ updated: number } | null> {
    try {
      return await this.procedure<{ updated: number }>(
        "editar_boletim_numero",
        value
      )
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async updateClassificadorValue(
    value: number
  ): Promise<{ updated: number } | null> {
    try {
      return await this.procedure<{ updated: number }>(
        "editar_classificador_numero",
        value
      )
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }

  async updateIeptbValue(value: number): Promise<{ updated: number } | null> {
    try {
      return await this.procedure<{ updated: number }>(
        "editar_ieptb_numero",
        value
      )
    } catch (error: any) {
      throw new Error(`configuracoes -:${error.message}`)
    }
  }
}
