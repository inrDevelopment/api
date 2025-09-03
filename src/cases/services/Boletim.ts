//#region imports
import { PoolConnection } from "mysql2/promise"
import { defaultResponse } from "../core/defaultResponse"
import PublishMobile from "../core/PublishMobile"
import { Transaction } from "../core/transaction"
import BoletimRepository from "../repositories/Boletim"
import CanalRepository from "../repositories/Canal"
import ConfiguracoesRepository from "../repositories/Configuracoes"
import { aprovarServiceProps } from "../schemas/aprovarBoletim"
import { boletimNovoServiceProps } from "../schemas/boletimNovo"
import { commomDeleteServiceProps } from "../schemas/commomDelete"
import { getBoletimByIdServiceProps } from "../schemas/getBoletimById"
import { getTipoConteudoServiceProps } from "../schemas/getById"
import { getConteudoServiceProps } from "../schemas/getConteudo"
import { listarBoletimServiceProps } from "../schemas/listarBoletim"
import { publicarServiceProps } from "../schemas/publicarBoletim"
import { saveBoletimConteudoServiceProps } from "../schemas/saveBoletimConteudo"
import { salvarBoletimObservacaoServiceProps } from "../schemas/saveBoletimObservacao"
//#endregion imports

export default class BoletimService {
  constructor(
    private boletimRepository: BoletimRepository,
    private configuracoesRepository: ConfiguracoesRepository,
    private canalRepository: CanalRepository
  ) {}

  public async start(
    params: boletimNovoServiceProps
  ): Promise<defaultResponse> {
    try {
      const cfgText =
        await this.configuracoesRepository.getConfigurationObject()

      if (!cfgText) throw new Error("Erro ao criar o boletim.")

      let cfgObject = JSON.parse(cfgText.valor)

      let titulo = ""
      let numero = 0

      switch (params.boletim_tipo_id) {
        case 1: {
          if (cfgObject.O === "S")
            throw new Error(
              "Criação de be bloqueada. Exclua ou publique o ultimo boletim criado."
            )

          const numRes = await this.configuracoesRepository.getBeNumero()
          if (!numRes) throw new Error("Erro ao obter número para o boletim.")

          numero = +numRes.valor

          cfgObject.O = "S"

          titulo = `Boletim Eletrônico INR nº ${numero}, de ${params.data.toLocaleDateString(
            "pt-BR"
          )}`
          break
        }
        case 2: {
          if (cfgObject.E === "S") {
            throw new Error(
              "Criação de be bloqueada. Exclua ou publique o ultimo boletim criado."
            )
          }

          const numRes = await this.configuracoesRepository.getBeNumero()

          if (!numRes) throw new Error("Erro ao obter número para o boletim.")

          numero = +numRes.valor

          cfgObject.E = "S"

          titulo = `Edição Extraordinária - Boletim Eletrônico INR nº ${numero}, de ${params.data.toLocaleDateString(
            "pt-BR"
          )}`
          break
        }
        case 3: {
          if (cfgObject.C === "S") {
            throw new Error(
              "Criação de be bloqueada. Exclua ou publique o ultimo boletim criado."
            )
          }

          const numRes = await this.configuracoesRepository.getBeNumero()

          if (!numRes)
            throw new Error("Erro ao obter número para o classificador.")

          numero = +numRes.valor

          cfgObject.C = "S"

          titulo = `Classificadores - SP/PR/RS - Boletim Eletrônico INR nº ${numero}, ${params.data.toLocaleDateString(
            "pt-BR"
          )}`

          break
        }
      }

      const novo = await this.boletimRepository.novo({
        titulo,
        tipo: params.boletim_tipo_id,
        numero: numero,
        data: params.data,
        criado_id: params.idusuario
      })

      if (!novo) throw new Error("Erro ao criar boletim")

      await this.configuracoesRepository.updateConfigurationObject(cfgObject)

      return {
        success: true,
        data: novo
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async tipo(): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.tipoBoletimLista()
      return {
        success: true,
        data: list
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async conteudoTipo(
    params: getTipoConteudoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.tipoConteudoLista({
        idtipoboletim: params.idtipoboletim
      })

      return {
        success: true,
        data: list
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async select(
    params: getBoletimByIdServiceProps
  ): Promise<defaultResponse> {
    try {
      const be = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.idBoletim
      })

      if (!be) throw new Error("Boletim não encontrado.")

      const list = await this.boletimRepository.getBoletimItems({
        idBoletim: be.id
      })

      let conteudo: {
        conteudo_tipo_id: number
        items: {
          id: number | null
          identificador: number
          titulo: string
          url: string
        }[]
      }[] = []

      for (let i = 0; i < list.length; i++) {
        const conteudoTipoId = list[i].conteudo_tipo_id

        const conteudoEncontrado = conteudo.findIndex(
          c => c.conteudo_tipo_id === conteudoTipoId
        )

        if (conteudoEncontrado < 0) {
          conteudo.push({
            conteudo_tipo_id: conteudoTipoId,
            items: [
              {
                id: list[i].id,
                identificador: list[i].identificador,
                titulo: list[i].titulo,
                url: list[i].url
              }
            ]
          })
        } else {
          conteudo[conteudoEncontrado].items.push({
            id: list[i].id,
            identificador: list[i].identificador,
            titulo: list[i].titulo,
            url: list[i].url
          })
        }
      }

      return {
        success: true,
        data: { ...be, conteudo }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  public async getConteudo(
    params: getConteudoServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.getBoletimItems({
        idBoletim: params.idBoletim
      })

      return { success: true, data: list }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Transaction()
  public async saveConteudo(
    params: saveBoletimConteudoServiceProps,
    conn?: PoolConnection
  ): Promise<defaultResponse> {
    if (!conn) throw new Error("Sem conexão ativa com o banco de dados.")

    await this.boletimRepository.excluirItemsBoletim(
      {
        idBoletim: params.idBoletim
      },
      conn
    )

    for (let i = 0; i < params.conteudo.length; i++) {
      const conteudoTipoId = params.conteudo[i].conteudo_tipo_id

      for (let y = 0; y < params.conteudo[i].items.length; y++) {
        const novoItemParams = {
          boletimId: params.idBoletim,
          conteudoTipoId,
          identificador: params.conteudo[i].items[y].identificador,
          titulo: params.conteudo[i].items[y].titulo,
          conteudo: "",
          url: params.conteudo[i].items[y].url,
          ordem: y + 1
        }

        const novoItemResponse = await this.boletimRepository.novoItemBoletim(
          novoItemParams,
          conn
        )

        params.conteudo[i].items[y].id = novoItemResponse.id
      }
    }

    await this.boletimRepository.removeAprovacao(
      {
        idBoletim: params.idBoletim
      },
      conn
    )

    return {
      success: true,
      data: {
        edicao: {
          editadopor: params.nomeusuario,
          editadoem: new Date()
        },
        conteudo: params.conteudo
      }
    }
  }

  @Transaction()
  public async saveObservacao(
    params: salvarBoletimObservacaoServiceProps,
    conn?: PoolConnection
  ): Promise<defaultResponse> {
    try {
      if (!conn) throw new Error("Sem conexão ativa com o banco de dados.")

      const result = await this.boletimRepository.updateObservacaoBoletim(
        {
          idBoletim: params.idBoletim,
          observacao: params.observacao,
          idUsuario: params.idusuario
        },
        conn
      )

      if (result.affectedRows > 0) {
        return {
          success: true,
          data: {
            edicao: {
              editadopor: params.nomeusuario,
              editadoem: new Date(),
              aprovado: "N",
              aprovadoEm: new Date(),
              aprovadoPor: params.nomeusuario
            }
          },
          message: "observação salva com sucesso."
        }
      } else {
        return {
          success: false,
          message: "Nenhuma alteração foi realizada."
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Transaction()
  public async aprovar(
    params: aprovarServiceProps,
    conn?: PoolConnection
  ): Promise<defaultResponse> {
    try {
      if (!conn) throw new Error("Sem conexão ativa com o banco de dados.")

      const boletim = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.idBoletim
      })

      if (!boletim) throw new Error("Erro ao verificar o boletim")

      if (boletim.publicado === "S")
        throw new Error(
          "O boletim ja foi publicado. Não é permitido aprova-lo."
        )

      const aprovarResult = await this.boletimRepository.aprovar(
        {
          idBoletim: params.idBoletim,
          idUsuario: params.idUsuario
        },
        conn
      )

      if (aprovarResult.affectedRows <= 0) throw new Error("Nada foi alterado.")

      return {
        success: true,
        data: {
          aprovado: "S",
          aprovadoEm: new Date(),
          aprovadoPor: params.nomeUsuario
        },
        message: "Boletim aprovado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Transaction()
  public async publicar(
    params: publicarServiceProps,
    conn?: PoolConnection
  ): Promise<defaultResponse> {
    try {
      if (!conn) throw new Error("Sem conexão ativa com o banco de dados.")

      const boletim = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.idBoletim
      })

      if (!boletim) throw new Error("Erro ao verificar o boletim")

      if (boletim.publicado === "S")
        throw new Error(
          "O boletim ja foi publicado. Não é permitido publica-lo."
        )

      if (boletim.aprovado === "N")
        throw new Error(
          "O boletim ainda não foi aprovado. Aprove-o antes de publica-lo."
        )

      const cfgText =
        await this.configuracoesRepository.getConfigurationObject()

      if (!cfgText) throw new Error("Erro ao criar o boletim.")

      let cfgObject = JSON.parse(cfgText.valor)

      switch (boletim.boletim_tipo_id) {
        case 1: {
          const novoNumero: number = +boletim.numero + 1

          const beo = await this.configuracoesRepository.updateBEvalue(
            { novoNumeroBE: novoNumero },
            conn
          )

          if (beo.affectedRows <= 0)
            throw new Error("Erro ao configurar publicação.")

          cfgObject.O = "N"

          break
        }

        case 2: {
          const novoNumero: number = +boletim.numero + 1

          const bee = await this.configuracoesRepository.updateBEvalue(
            { novoNumeroBE: novoNumero },
            conn
          )

          if (bee.affectedRows <= 0)
            throw new Error("Erro ao configurar publicação.")

          cfgObject.E = "N"

          break
        }

        case 3: {
          const novoNumero: number = +boletim.numero + 1
          const bec = await this.configuracoesRepository.updateBEvalue(
            { novoNumeroBE: novoNumero },
            conn
          )

          if (bec.affectedRows <= 0)
            throw new Error("Erro ao configurar publicação.")

          cfgObject.C = "N"

          break
        }
      }

      await this.configuracoesRepository.updateConfigurationObject(cfgObject)

      const publicarResult = await this.boletimRepository.publicar(
        {
          idBoletim: params.idBoletim,
          idUsuario: params.idUsuario
        },
        conn
      )

      if (publicarResult.affectedRows <= 0)
        throw new Error("Nada foi alterado.")

      const publishMobile = new PublishMobile(this.canalRepository)

      publishMobile.process()

      return {
        success: true,
        data: {
          publicado: "S",
          publicadoEm: new Date(),
          publicadoPor: params.nomeUsuario
        },
        message: "Boletim publicado com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Transaction()
  public async excluir(
    params: commomDeleteServiceProps,
    conn?: PoolConnection
  ): Promise<defaultResponse> {
    try {
      if (!conn) throw new Error("Sem conexão ativa com o banco de dados.")

      const boletim = await this.boletimRepository.selecionarBoletim({
        idBoletim: params.id
      })

      if (!boletim) throw new Error("Erro ao verificar o boletim")

      if (boletim.publicado === "S")
        throw new Error("Boletim já publica. Não pode ser excluido.")

      const deleteResponse = await this.boletimRepository.excluirBoletim(
        { idBoletim: params.id, idUsuario: params.idusuario },
        conn
      )

      if (deleteResponse.affectedRows <= 0)
        throw new Error("Nada foi alterado.")

      return {
        success: true,
        message: "Boletim excluido com sucesso."
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async listar(
    params: listarBoletimServiceProps
  ): Promise<defaultResponse> {
    try {
      const list = await this.boletimRepository.listarBoletimPainel({
        numero: params.numero,
        boletimTipo: params.boletimTipo,
        data: params.data,
        pagina: params.pagina,
        limite: params.limite
      })

      const count = await this.boletimRepository.listarBoletimPainelCount({
        numero: params.numero,
        boletimTipo: params.boletimTipo,
        data: params.data
      })
      return {
        success: true,
        data: {
          list,
          count: count?.count
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
