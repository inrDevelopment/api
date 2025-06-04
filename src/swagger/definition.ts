import swaggerJSDoc from "swagger-jsdoc"
import application from "../config/application"
import components from "./components"
import paths from "./paths"
const servers = [
  {
    url: "https://api.publicacoesinr.com.br",
    description: "Servidor de produção"
  }
]

if (application.env === "dev")
  servers.push({
    url: "http://localhost:3001",
    description: "Servidor local"
  })

const definition: swaggerJSDoc.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API INR",
    version: "1.0.0",
    description: "Documentação da API INR"
  },
  servers,
  paths,
  components
}

export default definition
