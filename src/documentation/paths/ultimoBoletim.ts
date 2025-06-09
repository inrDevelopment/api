import swaggerJSDoc from "swagger-jsdoc"

const ultimoBoletim: swaggerJSDoc.PathItem = {
  get: {
    description: "Ultimo conteudo publicado",
    tags: ["/leitor"],
    summary:
      "Traz o último boletim aprovado e publicado referente ao tipo requisitado.",
    parameters: [
      {
        in: "query",
        name: "id",
        type: "integer",
        required: true,
        description: "Tipo de boletim"
      }
    ],
    responses: {
      200: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "number" },
                titulo: { type: "string" },
                data: {
                  type: "string",
                  format: "datetime"
                },
                numero: { type: "string" }
              }
            }
          }
        },
        description: "Resposta de sucesso."
      }
    }
  }
}

export default ultimoBoletim
