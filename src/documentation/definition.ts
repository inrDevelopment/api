import swaggerJSDoc from "swagger-jsdoc"
import application from "../config/application"
import components from "./components"
import paths from "./paths"

const svrs = {
  url:
    application.env === "dev"
      ? `${application.host.dev}:${application.port}`
      : `${application.host.prod}`
}

const definition: swaggerJSDoc.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API INR",
    version: "1.0.0",
    description: "Documentação da API INR"
  },
  servers: [svrs],
  paths,
  components
}

export default definition
