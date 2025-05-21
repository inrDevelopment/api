import swaggerJSDoc from "swagger-jsdoc"

const listarBoletins: swaggerJSDoc.PathItem = {
  post: {
    description:
      "Lista os boletins criados que já foram aprovados e publicados.",
    tags: ["/boletim"],
    summary: "Listar boletim.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              titulo: {
                type: "string"
              },
              boletim_tipo_id: {
                type: "number"
              },
              data: {
                type: "string",
                format: "date"
              },
              limite: {
                type: "number"
              },
              pagina: {
                type: "number"
              }
            },
            required: ["boletim_tipo_id", "data", "limite", "pagina"]
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
                            format: "date"
                          },
                          numero: { type: "string" },
                          lido: { type: "string" },
                          favorito: { type: "string" }
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

export default listarBoletins
