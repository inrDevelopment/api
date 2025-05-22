import swaggerJSDoc from "swagger-jsdoc"

const favoriteThis: swaggerJSDoc.PathItem = {
  get: {
    description: "Adiciona um boletim aos favoritos.",
    tags: ["/leitor"],
    summary: "Adiciona boletins aos favoritos",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer"
        },
        description: "Id do boletim que será inserido nos favoritos."
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
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  }
}

export default favoriteThis
