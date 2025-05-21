import { defaultResponse } from "../core/defaultResponse"
import BoletimRepository from "../repositories/Boletim"
import ConfiguracoesRepository from "../repositories/Configuracoes"
import { boletimNovoServiceProps } from "../schemas/boletimNovo"
import { listarBoletimServiceProps } from "../schemas/listarBoletim"

export default class BoletimService {
  constructor(
    private boletimRepository: BoletimRepository,
    private configuracoesRepository: ConfiguracoesRepository
  ) {}

  async novoBoletim(params: boletimNovoServiceProps): Promise<defaultResponse> {
    try {
      const hasBlock = await this.configuracoesRepository.hasBoletimblock()

      if (!hasBlock)
        throw new Error(
          "Configurações estão ausentes. Contacte o administrador do sistema."
        )

      if (hasBlock.valor === "S")
        throw new Error(
          "Já existe um conteúdo sendo criado. Por favor finalize esse boletim antes de criar outro."
        )

      await this.configuracoesRepository.updateBlock({ value: "S" })

      let numero: { valor: number } | null = null
      let titulo: string = ""

      switch (params.boletim_tipo_id) {
        case 1:
        case 2:
          numero = await this.configuracoesRepository.numeroBoletim()
          break
        case 3:
          numero = await this.configuracoesRepository.numeroClassificador()
          break
        case 4:
          numero = await this.configuracoesRepository.numeroIeptb()
          break
      }

      if (!numero) throw new Error("Erro ao verificar a númeração do boletim.")

      switch (params.boletim_tipo_id) {
        case 1:
          titulo = `Boletim Eletrônico INR nº ${
            numero.valor
          }, de ${params.data.toLocaleDateString()}`
          break
        case 2:
          titulo = `Edição Extraordinária - Boletim Eletrônico INR nº ${
            numero.valor
          }, de ${params.data.toLocaleDateString()}`
          break
        case 3:
          titulo = `Classificadores - SP/PR/RS - Boletim Eletrônico INR nº ${
            numero.valor
          }, de ${params.data.toLocaleDateString()}`
          break
        case 4:
          titulo = `Boletim Eletrônico INR / IEPTB nº ${
            numero.valor
          }, de ${params.data.toLocaleDateString()}`
          break
        case 5:
        case 6:
          titulo = params.titulo ? params.titulo : ""
          break
      }

      const be = await this.boletimRepository.novo({
        titulo: titulo,
        tipo: params.boletim_tipo_id,
        numero: numero.valor,
        data: params.data,
        criado_id: params.idusuario
      })

      if (!be)
        throw new Error("Não foi possivel validar a criação do novo boletim.")

      if (params.boletim_tipo_id !== 5 && params.boletim_tipo_id !== 6) {
        switch (params.boletim_tipo_id) {
          case 1:
          case 2:
            await this.configuracoesRepository.updateBoletimValue(numero.valor)
            break
          case 3:
            await this.configuracoesRepository.updateClassificadorValue(
              numero.valor
            )
            break
          case 4:
            await this.configuracoesRepository.updateIeptbValue(numero.valor)
            break
        }
      }

      return {
        success: true,
        data: { idboletim: be.boletim_id },
        message: `Boletim Nº ${numero.valor} criado com sucesso.`
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async listarBoletins(
    params: listarBoletimServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listarBoletim({
        searchText: params.titulo,
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data,
        limite: params.limite,
        pagina: params.pagina * params.limite
      })

      const res = await this.boletimRepository.listarBoletimCount({
        searchText: params.titulo,
        tipo_id: params.boletim_tipo_id,
        data_boletim: params.data
      })

      if (!res) throw new Error("Erro ao listar os boletins.")

      return {
        success: false,
        data: {
          list,
          count: res.count
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
