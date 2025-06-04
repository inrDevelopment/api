import swaggerJSDoc from "swagger-jsdoc"

const markAsReaded: swaggerJSDoc.PathItem = {
  get: {
    description: "Marca um boletim como lido de um usuário",
    tags: ["/leitor"],
    summary: "Marca um boletim como lido",
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
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do boletim a ser marcado como lido."
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
                  description: "Boletim marcado como lido."
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

export default markAsReaded
