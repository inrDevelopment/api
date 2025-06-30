import swaggerJSDoc from "swagger-jsdoc"

const TAG = "Boletim"

const novo: swaggerJSDoc.PathItem = {
  post: {
    description: "Novo boletim",
    tags: [TAG],
    summary: "Cria um novo boletim eletrônico",
    parameters: [
      {
        in: "header",
        name: "credential",
        schema: {
          type: "string",
          required: true
        },
        description: "Credenciais de segurança de usuario"
      }
    ],
    requestBody: {
      required: true,
      content: {}
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
                    id: { type: "integer" }
                  }
                },
                message: {
                  type: "string",
                  description: "Boletim criado com sucesso."
                }
              }
            }
          }
        }
      }
    }
  }
}

const update: swaggerJSDoc.PathItem = {
  put: {
    description: "Editar boletim",
    tags: [TAG],
    summary: "Edita um boletim eletrônico existente.",
    parameters: [
      {
        in: "header",
        name: "credential",
        schema: {
          type: "string",
          required: true
        },
        description: "Credenciais de segurança de usuario"
      },
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do boletim a ser editado."
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              titulo: {
                type: "string",
                required: true
              },
              data: {
                type: "string",
                format: "date",
                required: true
              }
            },
            required: ["titulo", "data"]
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
                message: {
                  type: "string",
                  description: "Boletim editado com sucesso."
                }
              }
            }
          }
        }
      }
    }
  }
}

const item: swaggerJSDoc.PathItem = {
  post: {
    description: "Novo item do boletim",
    tags: [TAG],
    summary: "Adiciona um novo item a um boletim eletrônico existente.",
    parameters: [
      {
        in: "header",
        name: "credential",
        schema: {
          type: "string",
          required: true
        },
        description: "Credenciais de segurança de usuario"
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "integer"
              },
              idBoletim: {
                type: "integer"
              },
              boletimConteudoTipoId: {
                type: "integer"
              },
              ordem: {
                type: "integer"
              }
            },
            required: ["id", "idBoletim", "boletimConteudoTipoId", "ordem"]
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
                message: {
                  type: "string",
                  description: "Item de boletim edicionado com sucesso."
                }
              }
            }
          }
        }
      }
    }
  }
}

const itemUpdate: swaggerJSDoc.PathItem = {
  put: {
    description: "Editar item do boletim",
    tags: [TAG],
    summary: "Edita um dos items de um boletim eletrônico existente.",
    parameters: [
      {
        in: "header",
        name: "credential",
        schema: {
          type: "string",
          required: true
        },
        description: "Credenciais de segurança de usuario"
      },
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do item do boletim a ser editado."
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              conteudoTipoId: { type: "integer" },
              boletimId: { type: "integer" },
              identificador: { type: "integer" },
              ordem: { type: "integer" }
            },
            required: ["conteudoTipoId", "boletimId", "identificador", "ordem"]
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
                message: {
                  type: "string",
                  description: "Item do boletim editado com sucesso."
                }
              }
            }
          }
        }
      }
    }
  }
}

const itemDelete: swaggerJSDoc.PathItem = {
  delete: {
    description: "Exclui um item do boletim.",
    tags: [TAG],
    summary: "Exclui um item do boletim.",
    parameters: [
      {
        in: "header",
        name: "credential",
        schema: {
          type: "string",
          required: true
        },
        description: "Credenciais de segurança de usuario"
      },
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do item do boletim a ser editado."
      }
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              conteudoTipoId: { type: "integer" },
              boletimId: { type: "integer" },
              identificador: { type: "integer" },
              ordem: { type: "integer" }
            },
            required: ["conteudoTipoId", "boletimId", "identificador", "ordem"]
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
                message: {
                  type: "string",
                  description: "Item do boletim editado com sucesso."
                }
              }
            }
          }
        }
      }
    }
  }
}

export default { item, itemDelete, itemUpdate, novo, update }
