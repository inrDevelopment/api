import swaggerJSDoc from "swagger-jsdoc"

const markAsReaded: swaggerJSDoc.PathItem = {
  get: {
    description: "Marca um determinado Boletim como lido.",
    tags: ["/leitor"],
    summary: "Marcar como lido.",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer"
        },
        description: "Id do boletim que será marcado como lido."
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

export default markAsReaded
