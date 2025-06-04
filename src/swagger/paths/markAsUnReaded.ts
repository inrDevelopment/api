import swaggerJSDoc from "swagger-jsdoc"

const markAsUnReaded: swaggerJSDoc.PathItem = {
  delete: {
    description: "Remove um boletim previamente marcado como lido.",
    tags: ["/leitor"],
    summary: "Remove um boletim da lista leitura.",
    parameters: [
      {
        in: "header",
        name: "authorization",
        schema: {
          type: "string",
          required: true
        }
      },
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do boletim a ser removido."
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
                message: {
                  type: "string",
                  description: "Boletim marcado como não lido."
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

export default markAsUnReaded
