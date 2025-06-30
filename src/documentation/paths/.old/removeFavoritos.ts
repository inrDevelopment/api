import swaggerJSDoc from "swagger-jsdoc"

const removeFavoritos: swaggerJSDoc.PathItem = {
  delete: {
    description: "Remove um boletim previamente adicionado aos favoritos",
    tags: ["/leitor"],
    summary: "Remove um boletim dos favoritos.",
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
        description: "O número do boletim a ser removido dos favoritos."
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
                  description: "Boletim removido dos favoritos"
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

export default removeFavoritos
