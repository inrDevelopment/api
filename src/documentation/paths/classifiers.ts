import swaggerJSDoc from "swagger-jsdoc"

const TAG = "Classificadores"

const state: swaggerJSDoc.PathItem = {
  get: {
    description: "Estado do boletim.",
    tags: [TAG],
    summary: "Seleciona as informações de classificadores referente a sigla",
    parameters: [
      {
        in: "query",
        name: "acronym",
        type: "string",
        required: true
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
                data: {
                  type: "object",
                  properties: {
                    idestado: { type: "integer" },
                    titulo: { type: "string" },
                    banner: { type: "string" }
                  }
                }
              }
            }
          }
        }
      },
      description: "Resposta de sucesso."
    }
  }
}

const list: swaggerJSDoc.PathItem = {
  get: {
    description: "Listar classificadores",
    tags: [TAG],
    summary: "Lista os classificadores existentes.",
    parameters: [
      {
        in: "query",
        name: "id",
        type: "integer",
        required: true
      },
      {
        in: "query",
        name: "page",
        type: "integer",
        required: true
      },
      {
        in: "query",
        name: "limit",
        type: "integer",
        required: true
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
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      label: { type: "string" },
                      tipo: { type: "string" },
                      datacad: { type: "string" },
                      data_ordem: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      description: "Resposta de sucesso."
    }
  }
}

const select: swaggerJSDoc.PathItem = {
  get: {
    description: "Seleciona uma classificador.",
    tags: [TAG],
    summary: "Seleciona um classificador e todos os seus itens.",
    parameters: [
      {
        in: "path",
        name: "id",
        type: "integer",
        required: true,
        description: "O número do classificador."
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
                data: {
                  type: "object",
                  properties: {
                    ids: {
                      type: "object",
                      properties: {
                        processosid: {
                          type: "object",
                          properties: {
                            secao: { type: "string" },
                            especie: { type: "string" },
                            numero: { type: "integer" },
                            vara: { type: "string" },
                            comarca: { type: "string" },
                            texto: { type: "string" },
                            loading: { type: "boolean" }
                          }
                        }
                      }
                    },
                    barra: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          titulo: { type: "string" },
                          cor: { type: "string" },
                          orgao: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: { type: "integer" },
                                titulo: { type: "string" },
                                departamento: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      id: { type: "integer" },
                                      nome: { type: "string" },
                                      atos: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            id: { type: "integer" },
                                            titulo: { type: "string" },
                                            ancora: { type: "string" },
                                            datacad: {
                                              type: "string",
                                              format: "date"
                                            },
                                            secao: { type: "string" },
                                            anexos: {
                                              type: "array",
                                              items: {}
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
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      description: "Resposta de sucesso."
    }
  }
}

const actContent: swaggerJSDoc.PathItem = {
  get: {
    description: "Conteúdo do ato.",
    tags: [TAG],
    summary: "Seleciona o conteúdo de um ato.",
    parameters: [],
    responses: {
      200: {}
    }
  }
}

const previousActs: swaggerJSDoc.PathItem = {
  get: {
    description: "Ato anterior",
    tags: [TAG],
    summary: "Seleciona ato anterior.",
    parameters: [],
    responses: {
      200: {}
    }
  }
}

const previousBars: swaggerJSDoc.PathItem = {
  get: {
    description: "Barra anterior",
    tags: [TAG],
    summary: "Seleciona barra anterior.",
    parameters: [],
    responses: {
      200: {}
    }
  }
}

export default { state, list, select, actContent, previousActs, previousBars }
