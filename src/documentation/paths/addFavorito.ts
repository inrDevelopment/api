import swaggerJSDoc from "swagger-jsdoc"

const addFavorito: swaggerJSDoc.PathItem = {
  get: {
    description: "Marca um boletim como favorito",
    tags: ["/leitor"],
    summary: "Marca um boletim favorito somente para usuários autenticados.",
    parameters: [
      {
        in: "header",
        name: "Authorization",
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
        description: "O número do boletim a ser marcado como favorito."
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
                  description: "Boletim adicionado aos favorito."
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

export default addFavorito
