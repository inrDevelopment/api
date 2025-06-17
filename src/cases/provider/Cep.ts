import Provider from "../core/Provider"

type defaultResponse<T = any> = {
  success: boolean
  message?: string
  data?: T
}

type cepres = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: number
  gia: number
  ddd: number
  siafi: number
}

export class Cep extends Provider {
  public async busca(params: {
    cep: string
  }): Promise<defaultResponse<cepres>> {
    try {
      const fetchResponse = await this.fetch.get<cepres>({
        url: `https://viacep.com.br/ws/${params.cep}/json`
      })

      if (fetchResponse.success) {
        return {
          success: true,
          message: fetchResponse.message,
          data: fetchResponse.data
        }
      } else throw new Error(fetchResponse.message)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
