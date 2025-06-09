import swaggerJSDoc from "swagger-jsdoc"

const registrarLeitor: swaggerJSDoc.PathItem = {
  post: {
    description:
      "Registra uma instalação do Leitor INR para permitir o dispositivo receber notificações futuras.",
    tags: ["/leitor"],
    summary: "Registra Leitor INR",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              uuid: {
                type: "string"
              },
              token: {
                type: "string"
              }
            },
            required: ["uuid", "token"]
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: {
              properties: {
                success: {
                  type: "boolean"
                },
                message: {
                  type: "string",
                  description: "Aparelho registrado com sucesso."
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

export default registrarLeitor
