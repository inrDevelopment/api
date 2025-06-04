//#region imports
import sanitize from "../../../lib/sanitize"
import { defaultResponse } from "../../core/defaultResponse"
import BoletimRepository from "../../repositories/Boletim"
import ConfiguracoesRepository from "../../repositories/Configuracoes"
import { adicionarItemBoletimServiceProps } from "../../schemas/adicionarItemBoletim"
import { boletimAprovarServiceProps } from "../../schemas/boletimAprovar"
import { boletimExcluirServiceProps } from "../../schemas/boletimExcluir"
import { boletimNovoServiceProps } from "../../schemas/boletimNovo"
import { boletimPublicarServiceProps } from "../../schemas/boletimPublicar"
import { boletimSelecionarServiceProps } from "../../schemas/boletimSelecionar"
import { editarBoletimServiceProps } from "../../schemas/editarBoletim"
import Core from "./Core"
//#endregion imports

const tag = {
  "1": "boletim/noticia",
  "2": "boletim/jurisprudencia",
  "3": "boletim/legislacao",
  "4": "boletim/opiniao",
  "5": "boletim/pergunta-e-resposta",
  "6": "boletim/mensagem-editores",
  "7": "boletim/pareceresCGJ",
  "8": "boletim/suplemento",
  "9": "boletim/historia",
  "10": "servicos/INRcursos",
  "11": "boletim/ato-anterior/37/2025",
  "12": "boletim/classificadorINR-SP",
  "13": "",
  "14": "",
  "15": "boletim/classificadorINR-PR",
  "16": "",
  "17": "",
  "18": "boletim/classificadoresINR-RS",
  "19": "",
  "20": "",
  "21": "boletim/noticia",
  "22": "boletim/jurisprudencia",
  "23": "boletim/legislacao",
  "24": "boletim/opiniao",
  "25": "boletim/pergunta-e-resposta",
  "26": "boletim/mensagem-editores",
  "27": "boletim/pareceresCGJ",
  "28": "boletim/suplemento",
  "29": "boletim/historia",
  "30": "servicos/INRcursos",
  "31": "boletim/noticia",
  "32": "boletim/jurisprudencia",
  "33": "boletim/legislacao",
  "34": "boletim/opiniao",
  "35": "boletim/pergunta-e-resposta",
  "36": "boletim/mensagem-editores",
  "37": "boletim/pareceresCGJ",
  "38": "boletim/suplemento",
  "39": "boletim/historia",
  "40": "servicos/INRcursos"
}

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

  async excluirBoletim(
    params: boletimExcluirServiceProps
  ): Promise<defaultResponse> {
    try {
      const canUpdate = await this.boletimRepository.canUpdate({
        idboletim: params.id
      })

      if (!canUpdate)
        throw new Error(
          "Boletim excluido ou publicado e não pode ser alterado."
        )

      const boletim = await this.boletimRepository.deleteBoletim({
        id: params.id,
        idusuario: params.idusuario
      })

      if (boletim.affectedRows <= 0) throw new Error("Erro ao excluir boletim.")

      return {
        success: true,
        message: `Boletim excluido com sucesso.`
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async selecionarBoletim(
    params: boletimSelecionarServiceProps
  ): Promise<defaultResponse> {
    try {
      const be = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.id
      })

      if (!be) throw new Error("Boletim não encontrado.")

      const content = await this.boletimRepository.selecionarBoletimitems({
        idBoletim: params.id
      })

      return {
        success: true,
        data: { ...be, conteudo: content }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // async listaBoletim(
  //   params: listarBoletimServiceProps
  // ): Promise<defaultResponse> {
  //   try {
  //     const list = await this.boletimRepository.listarBoletim({
  //       idUsuario: 37,
  //       searchText: params.titulo,
  //       tipo_id: params.boletim_tipo_id,
  //       data_boletim: params.data,
  //       limite: params.limite,
  //       pagina: params.pagina * params.limite
  //     })

  //     const count = await this.boletimRepository.listarBoletimCount({
  //       searchText: params.titulo,
  //       tipo_id: params.boletim_tipo_id,
  //       data_boletim: params.data
  //     })

  //     return {
  //       success: true,
  //       data: {
  //         list,
  //         count
  //       }
  //     }
  //   } catch (error: any) {
  //     return {
  //       success: false,
  //       message: error.message
  //     }
  //   }
  // }

  async aprovarBoletim(
    params: boletimAprovarServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.boletimRepository.aprovarBoletim({
        idBoletim: params.idBoletim,
        idUsuario: params.idusuario
      })

      if (response.affectedRows <= 0)
        throw new Error("Erro ao aprovar o boletim.")

      return {
        success: true,
        message: "Boletim aprovado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async publicarBoletim(
    params: boletimPublicarServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.boletimRepository.publicarBoletim({
        idBoletim: params.idBoletim,
        idUsuario: params.idusuario
      })

      if (response.affectedRows <= 0)
        throw new Error("Erro ao aprovar o boletim.")

      return {
        success: true,
        message: "Processo de publicação iniciado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async adicionarItemBoletim(
    params: adicionarItemBoletimServiceProps
  ): Promise<defaultResponse> {
    try {
      const be = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.idBoletim
      })

      if (!be) throw new Error("Erro ao processar o boletim.")

      const needContent =
        params.boletimConteudoTipoId >= 31 || params.boletimConteudoTipoId <= 40
          ? true
          : false

      const res = await this.core.processBoletimItem({
        id: params.id,
        boletim_conteudo_tipo_id: params.boletimConteudoTipoId,
        content: needContent,
        data: be.data
      })

      let url = `https://inrpublicacoes.com.br/site/${
        tag[`${params.boletimConteudoTipoId}` as keyof typeof tag]
      }/${params.id}`

      if (
        params.boletimConteudoTipoId === 12 ||
        params.boletimConteudoTipoId === 15 ||
        params.boletimConteudoTipoId === 18
      ) {
        url = url + "/ler"
      } else {
        url = url + `/${sanitize(res.titulo)}`
      }

      const item = await this.boletimRepository.novoItemBoletim({
        boletimId: params.idBoletim,
        conteudo: needContent && res.text ? res.text : "",
        conteudoTipoId: params.boletimConteudoTipoId,
        ordem: params.ordem,
        titulo: res.titulo,
        url
      })

      if (!item) throw new Error("Erro ao processar o boletim.")

      return {
        success: true,
        data: {
          id: item.id
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
