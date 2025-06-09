import { decode } from "html-entities"
import { execute } from "../../../lib/database"
import BoletimRepository from "../../repositories/Boletim"
import ConfiguracoesRepository from "../../repositories/Configuracoes"

export default class Core {
  constructor(
    private boletimRepository: BoletimRepository,
    private configuracoesRepository: ConfiguracoesRepository
  ) {}

  private fixText(html: string): string {
    let texto = decode(html)

    texto = texto.replace(/<[^>]+>/g, "")

    texto = decode(texto)

    texto = texto
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    return texto
  }

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

  async processBoletimItem(params: {
    id: number
    boletim_conteudo_tipo_id: number
    content: boolean
    data?: string
  }): Promise<{ titulo: string; text?: string }> {
    let response: { titulo: string; text?: string } | null = null

    switch (params.boletim_conteudo_tipo_id) {
      // noticia
      case 1:
      case 21:
      case 31:
        const tempNo = await execute<{ titulo: string; text: string }>(`
          SELECT titulo, texto FROM noticia WHERE idnoticia = ${params.id};
        `)

        if (!tempNo) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempNo.titulo),
            text: tempNo.text
          }
        } else {
          response = {
            titulo: this.fixText(tempNo.titulo)
          }
        }

        break
      // jurisprudencia
      case 2:
      case 22:
      case 32:
        const tempJus = await execute<{ titulo: string; text: string }>(`
          SELECT titulo, ato as "texto" FROM jurisprudencia WHERE idjurisprudencia = ${params.id};
        `)

        if (!tempJus) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempJus.titulo),
            text: tempJus.text
          }
        } else {
          response = {
            titulo: this.fixText(tempJus.titulo)
          }
        }
        break
      // legislacao
      case 3:
      case 23:
      case 33:
        const tempLeg = await execute<{ titulo: string; text: string }>(`
          SELECT titulo, texto FROM legislacao WHERE idlegislacao = ${params.id};
        `)

        if (!tempLeg) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempLeg.titulo),
            text: tempLeg.text
          }
        } else {
          response = {
            titulo: this.fixText(tempLeg.titulo)
          }
        }
        break
      // opniao
      case 4:
      case 24:
      case 34:
        const tempOpi = await execute<{ titulo: string; text: string }>(`
          SELECT titulo, texto FROM opniao WHERE idopiniao = ${params.id};
        `)

        if (!tempOpi) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempOpi.titulo),
            text: tempOpi.text
          }
        } else {
          response = {
            titulo: this.fixText(tempOpi.titulo)
          }
        }
        break
      // pergunta
      case 5:
      case 25:
      case 35:
        const tempPer = await execute<{ titulo: string; text: string }>(`
          SELECT titulo, texto FROM pergunta WHERE idpergunta = ${params.id};
        `)

        if (!tempPer) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempPer.titulo),
            text: tempPer.text
          }
        } else {
          response = {
            titulo: this.fixText(tempPer.titulo)
          }
        }
        break
      // msgeditor
      case 6:
      case 26:
      case 36:
        const tempMsg = await execute<{ titulo: string; text: string }>(`
           SELECT titulo, texto FROM msgeditor WHERE idmsgeditor = ${params.id};
        `)

        if (!tempMsg) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempMsg.titulo),
            text: tempMsg.text
          }
        } else {
          response = {
            titulo: this.fixText(tempMsg.titulo)
          }
        }
        break
      // pareceres
      case 7:
      case 27:
      case 37:
        const tempPar = await execute<{ titulo: string; text: string }>(`
           SELECT ementa as "titulo", texto FROM pareceres WHERE idpareceres = ${params.id};
        `)

        if (!tempPar) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempPar.titulo),
            text: tempPar.text
          }
        } else {
          response = {
            titulo: this.fixText(tempPar.titulo)
          }
        }
        break
      // suplementos
      case 8:
      case 28:
      case 38:
        const tempSup = await execute<{ titulo: string; text: string }>(`
           SELECT titulo, texto FROM suplemento WHERE idsuplemento = ${params.id};
        `)

        if (!tempSup) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempSup.titulo),
            text: tempSup.text
          }
        } else {
          response = {
            titulo: this.fixText(tempSup.titulo)
          }
        }
        break
      // historia
      case 9:
      case 29:
      case 39:
        const tempHis = await execute<{ titulo: string; text: string }>(`
           SELECT titulo, texto FROM historia WHERE idhistoria = ${params.id};
        `)

        if (!tempHis) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempHis.titulo),
            text: tempHis.text
          }
        } else {
          response = {
            titulo: this.fixText(tempHis.titulo)
          }
        }
        break
      // curso
      case 10:
      case 30:
      case 40:
        const tempCur = await execute<{ titulo: string; text: string }>(`
           SELECT titulo, texto FROM curso WHERE idcurso = ${params.id};
        `)

        if (!tempCur) throw new Error("Erro ao Processar Boletim")

        if (params.content) {
          response = {
            titulo: this.fixText(tempCur.titulo),
            text: tempCur.text
          }
        } else {
          response = {
            titulo: this.fixText(tempCur.titulo)
          }
        }
        break
      // acumulado
      case 11:
        response = {
          titulo: `Clique aqui e acesse o conteúdo acumulado até o dia ${params.data}`
        }
        break
      // classificador sp/pr/rs
      case 12:
      case 15:
      case 18:
        response = {
          titulo: `${params.data} – Clique aqui e acesse o conteúdo desta edição.`
        }
        break
      // Não houve publicação SP
      case 13:
        response = {
          titulo: `${params.data} – Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo na data de hoje.`
        }
        break
      // Não há atos de interesse SP
      case 14:
        response = {
          titulo: `${params.data} – Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do São Paulo.`
        }
        break
      // Não houve publicação PR
      case 16:
        response = {
          titulo: `${params.data} – Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná na data de hoje.`
        }
        break
      // Não há atos de interesse PR
      case 17:
        response = {
          titulo: `${params.data} – Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná.`
        }
        break
      // Não houve publicação RS
      case 19:
        response = {
          titulo: `${params.data} –  Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul na data de hoje.`
        }
        break
      // Não há atos de interesse RS
      case 20:
        response = {
          titulo: `${params.data} –  Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul.`
        }
        break
    }

    if (!response) throw new Error("Erro ao processar boletim.")

    return response
  }
}
