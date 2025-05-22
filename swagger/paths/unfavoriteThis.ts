import swaggerJSDoc from "swagger-jsdoc"

const unfavoriteThis: swaggerJSDoc.PathItem = {
  delete: {
    description: "Remove um boletim dos favoritos.",
    tags: ["/leitor"],
    summary: "Remove boletins dos favoritos.",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer"
        },
        description: "Id do boletim que será removido dos favoritos."
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

export default unfavoriteThis
