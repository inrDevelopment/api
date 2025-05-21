import swaggerJSDoc from "swagger-jsdoc"
const novoBoletim: swaggerJSDoc.PathItem = {
  post: {
    description: "Cria um novo boletim sem contéudo.",
    tags: ["/boletim"],
    summary: "Novo boletim",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              boletim_tipo_id: {
                type: "number"
              },
              data: {
                type: "string",
                format: "date"
              },
              titulo: {
                type: "string"
              }
            },
            required: ["boletim_tipo_id", "data"]
          }
        }
      }
    },
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
                    idboletim: {
                      type: "number"
                    }
                  }
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
export default novoBoletim
