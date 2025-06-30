import swaggerJSDoc from "swagger-jsdoc"
import application from "../config/application"
import components from "./components"
import paths from "./paths"
let server: swaggerJSDoc.Server = {
  url: ""
}

if (application.env === "prod") server.url = `${application.host.prod}`
else server.url = `${application.host.dev}:${application.port}`

const definition: swaggerJSDoc.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API INR",
    version: "1.0.0",
    description: "Documentação da API INR"
  },
  servers: [server],
  paths,
  components
}

export default definition
