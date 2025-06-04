import swaggerJSDoc from "swagger-jsdoc"

const loginLeitor: swaggerJSDoc.PathItem = {
  post: {
    description: "Login exclusivo para o leitor INR",
    tags: ["/leitor"],
    summary: "Login Leitor INR",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              uuid: {
                type: "string",
                required: true,
                description:
                  "Identificador gerado no dispositivo para identificar a instalação do Leitor INR."
              },
              login: {
                type: "string",
                required: true,
                description: "Login do usuário para login no Leitor INR"
              },
              senha: {
                type: "string",
                required: true,
                description: "Senha do usuário para login no Leitor INR"
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

export default loginLeitor
