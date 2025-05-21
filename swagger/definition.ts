import swaggerJSDoc from "swagger-jsdoc"
import components from "./components"
import paths from "./paths"

const definition: swaggerJSDoc.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API INR",
    version: "0.1.0",
    description: "Documentação da API INR"
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Servidor local"
    },
    {
      url: "https://api.inrpublicacoes.com.br",
      description: "Servidor de produção"
    }
  ],
  paths,
  components
}

export default definition
