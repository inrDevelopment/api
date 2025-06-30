import swaggerJSDoc from "swagger-jsdoc"

const listarBoletinsPublico: swaggerJSDoc.PathItem = {
  post: {
    description:
      "Lista os boletins criados que já foram aprovados e publicados para uso publico. Usar somente para o leitor.",
    tags: ["/leitor"],
    summary: "Listar boletim Publico (Não logado).",
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
                type: "array",
                items: {
                  type: "integer"
                }
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
                          numero: { type: "string" }
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

export default listarBoletinsPublico
