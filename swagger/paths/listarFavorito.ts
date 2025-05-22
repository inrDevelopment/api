import swaggerJSDoc from "swagger-jsdoc"

const listarFavoritos: swaggerJSDoc.PathItem = {
  post: {
    description: "Lista os boletins inserido como favorito.",
    tags: ["/leitor"],
    summary: "Listar favoritos.",
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
                          lido: { type: "boolean" }
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

export default listarFavoritos
