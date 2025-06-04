import swaggerJSDoc from "swagger-jsdoc"

const markAsReaded: swaggerJSDoc.PathItem = {
  get: {
    description: "Marca um boletim como favorito de um usuário",
    tags: ["/leitor"],
    summary: "Marca um boletim como favorito",
    parameters: [
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do boletim a ser favoritado."
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
