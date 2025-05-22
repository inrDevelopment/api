import swaggerJSDoc from "swagger-jsdoc"

const markAsUnreaded: swaggerJSDoc.PathItem = {
  delete: {
    description: "Marca um determinado Boletim como não lido.",
    tags: ["/leitor"],
    summary: "Marcar como não lido.",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer"
        },
        description: "Id do boletim que será marcado como não lido."
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

export default markAsUnreaded
