import swaggerJSDoc from "swagger-jsdoc"
import application from "../config/application"
import components from "./components"
import paths from "./paths"

const definition: swaggerJSDoc.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API INR",
    version: "1.0.0",
    description: "Documentação da API INR"
  },
  servers: [
    { url: `${application.host.dev}:${application.port}` },
    { url: `${application.host.prod}` }
  ],
  paths,
  components
}

export default definition
