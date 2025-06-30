import swaggerJSDoc from "swagger-jsdoc"

const loginApp: swaggerJSDoc.PathItem = {
  post: {
    description: "Login Leitor INR",
    tags: ["/seguranca"],
    summary: "Login exclusivo para o leitor INR",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              uuid: {
                type: "string",
                required: true
              },
              login: {
                type: "string",
                required: true
              },
              senha: {
                type: "string",
                required: true
              }
            },
            required: ["uuid", "login", "senha"]
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

export default loginApp
