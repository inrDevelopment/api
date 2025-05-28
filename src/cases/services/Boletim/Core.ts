import BoletimRepository from "../../repositories/Boletim"
import ConfiguracoesRepository from "../../repositories/Configuracoes"

export default class Core {
  constructor(
    private boletimRepository: BoletimRepository,
    private configuracoesRepository: ConfiguracoesRepository
  ) {}

  async processoBloqueio(): Promise<void> {
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
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async processoBoletim(params: {
    boletim_tipo_id: number
    data: Date
    idusuario: number
    titulo?: string
  }): Promise<{
    boletim_id: number
  }> {
    try {
      let numero: { valor: number } | null = null
      let be: { boletim_id: number } | null = null

      switch (params.boletim_tipo_id) {
        case 1:
          numero = await this.configuracoesRepository.numeroBoletim()

          if (!numero)
            throw new Error("Erro ao verificar a númeração do boletim.")

          be = await this.boletimRepository.novo({
            titulo: `Boletim Eletrônico INR nº ${
              numero.valor
            }, de ${params.data.toLocaleDateString()}`,
            tipo: params.boletim_tipo_id,
            numero: numero.valor,
            data: params.data,
            criado_id: params.idusuario
          })

          break
        case 2:
          numero = await this.configuracoesRepository.numeroBoletim()

          if (!numero)
            throw new Error("Erro ao verificar a númeração do boletim.")

          be = await this.boletimRepository.novo({
            titulo: `Edição Extraordinária - Boletim Eletrônico INR nº ${
              numero.valor
            }, de ${params.data.toLocaleDateString()}`,
            tipo: params.boletim_tipo_id,
            numero: numero.valor,
            data: params.data,
            criado_id: params.idusuario
          })

          break
        case 3:
          numero = await this.configuracoesRepository.numeroClassificador()

          if (!numero)
            throw new Error("Erro ao verificar a númeração do boletim.")

          be = await this.boletimRepository.novo({
            titulo: `Classificadores - SP/PR/RS - Boletim Eletrônico INR nº ${
              numero.valor
            }, de ${params.data.toLocaleDateString()}`,
            tipo: params.boletim_tipo_id,
            numero: numero.valor,
            data: params.data,
            criado_id: params.idusuario
          })

          break
        case 4:
          numero = await this.configuracoesRepository.numeroIeptb()

          if (!numero)
            throw new Error("Erro ao verificar a númeração do boletim.")

          be = await this.boletimRepository.novo({
            titulo: `Boletim Eletrônico INR / IEPTB nº ${
              numero.valor
            }, de ${params.data.toLocaleDateString()}`,
            tipo: params.boletim_tipo_id,
            numero: numero.valor,
            data: params.data,
            criado_id: params.idusuario
          })

          break
        case 5:
          be = await this.boletimRepository.novo({
            titulo: params.titulo ?? "",
            tipo: params.boletim_tipo_id,
            data: params.data,
            criado_id: params.idusuario
          })
          break
      }

      if (!be)
        throw new Error("Não foi possivel validar a criação do novo boletim.")

      return be
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
