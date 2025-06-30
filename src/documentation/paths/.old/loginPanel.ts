import swaggerJSDoc from "swagger-jsdoc"

const loginPanel: swaggerJSDoc.PathItem = {
  post: {
    description: "Login painel INR",
    tags: ["/seguranca"],
    summary: "Login exclusivo para o painel INR",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              login: {
                type: "string",
                required: true
              },
              senha: {
                type: "string",
                required: true
              }
            },
            required: ["login", "senha"]
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
                    nome: { type: "string" },
                    credential: { type: "string" }
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

export default loginPanel
