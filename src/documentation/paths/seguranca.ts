import swaggerJSDoc from "swagger-jsdoc"

const TAG = "Seguranca"

const authSite: swaggerJSDoc.PathItem = {
  post: {
    description: "Login site INR",
    tags: [TAG],
    summary: "Login exclusivo para o site INR",
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
        }
      }
    }
  }
}

const authPainel: swaggerJSDoc.PathItem = {
  post: {
    description: "Login painel INR",
    tags: [TAG],
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
        }
      }
    }
  }
}

const authApp: swaggerJSDoc.PathItem = {
  post: {
    description: "Login Leitor INR",
    tags: [TAG],
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
        }
      }
    }
  }
}

export default { authSite, authPainel, authApp }
