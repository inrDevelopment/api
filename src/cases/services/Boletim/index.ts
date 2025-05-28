import { defaultResponse } from "../../core/defaultResponse"
import BoletimRepository from "../../repositories/Boletim"
import ConfiguracoesRepository from "../../repositories/Configuracoes"
import { boletimNovoServiceProps } from "../../schemas/boletimNovo"
import { editarBoletimServiceProps } from "../../schemas/editarBoletim"
import Core from "./Core"

export default class BoletimService {
  private core: Core

  constructor(
    private boletimRepository: BoletimRepository,
    private configuracoesRepository: ConfiguracoesRepository
  ) {
    this.core = new Core(boletimRepository, configuracoesRepository)
  }

  async novoBoletim(params: boletimNovoServiceProps): Promise<defaultResponse> {
    try {
      await this.core.processoBloqueio()

      const be = await this.core.processoBoletim({
        boletim_tipo_id: params.boletim_tipo_id,
        data: params.data,
        idusuario: params.idusuario,
        titulo: params.titulo
      })

      return {
        success: true,
        data: { idboletim: be.boletim_id },
        message: `Boletim criado com sucesso.`
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async editarBoletim(
    params: editarBoletimServiceProps
  ): Promise<defaultResponse> {
    try {
      const canUpdate = await this.boletimRepository.canUpdate({
        idboletim: params.id
      })

      if (!canUpdate)
        throw new Error("Boletim excluido ou publicado. Não pode ser alterado.")

      let response: {
        affectedRows: number
      } | null = null

      switch (canUpdate.boletim_tipo_id) {
        case 1:
        case 2:
        case 3:
        case 4:
          response = await this.boletimRepository.dataUpdate({
            idboletim: canUpdate.id,
            dataBoletim: params.data,
            idusuario: params.idusuario
          })

          break
        case 5:
          response = await this.boletimRepository.dataAndTitleUpdate({
            title: params.titulo ?? "",
            idboletim: canUpdate.id,
            dataBoletim: params.data,
            idusuario: params.idusuario
          })

          break
      }

      if (!response || response.affectedRows <= 0)
        throw new Error("Nada foi alterado.")

      return {
        success: true,
        message: `Boletim alterado com sucesso.`
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
