import swaggerJSDoc from "swagger-jsdoc"

const lerBoletim: swaggerJSDoc.PathItem = {
  get: {
    description: "",
    tags: ["/leitor"],
    summary: "Seleciona boletim para leitura.",
    parameters: [
      {
        in: "header",
        name: "authorization",
        schema: {
          type: "string",
          required: true
        },
        description: "Token credencial do usuário"
      },
      {
        in: "query",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do boletim a ser visualizado."
      }
    ],
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
                    id: {
                      type: "integer"
                    },
                    titulo: {
                      type: "string"
                    },
                    numero: {
                      type: "string"
                    },
                    data: {
                      type: "string",
                      format: "datetime"
                    },
                    conteudo: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer"
                          },
                          conteudo_tipo_id: {
                            type: "integer"
                          },
                          tipo: { type: "string" },
                          titulo: { type: "string" },
                          url: { type: "string" },
                          conteudo: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        description: "Resposta de sucesso."
      }
    }
  }
}

export default lerBoletim
