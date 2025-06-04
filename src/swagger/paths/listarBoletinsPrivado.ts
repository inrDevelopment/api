import swaggerJSDoc from "swagger-jsdoc"

const listarBoletinsPrivado: swaggerJSDoc.PathItem = {
  post: {
    description:
      "Lista os boletins criados que já foram aprovados e publicados para usuários LOGADOS. Usar somente para o leitor.",
    tags: ["/leitor"],
    summary: "Listar boletim Privado (logado).",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              numero: {
                type: "string",
                required: false,
                description: "Número do boletim"
              },
              boletim_tipo_id: {
                type: "number",
                required: true,
                description:
                  "tipos de boletim: 1 - Ordinária, 2 - Extraordinária, 3 - Classificadores, 4 - Parceria IEPTB, 5 - Outros"
              },
              data: {
                type: "string",
                format: "date",
                required: false,
                description:
                  "Tipo de dado String mas en formato de data ex:'2025-05-30T18:52:23.529Z'."
              },
              limite: {
                type: "number",
                required: true
              },
              pagina: {
                type: "number",
                required: true
              }
            },
            required: ["boletim_tipo_id", "limite", "pagina"]
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean"
                },
                data: {
                  type: "object",
                  properties: {
                    list: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          titulo: { type: "string" },
                          data: {
                            type: "string",
                            format: "datetime"
                          },
                          numero: { type: "string" },
                          lido: { type: "boolean" },
                          favorito: { type: "boolean" }
                        }
                      }
                    },
                    count: {
                      type: "number"
                    }
                  }
                }
              }
            }
          }
        },
        description: "Resposte de sucesso."
      }
    }
  }
}

export default listarBoletinsPrivado
