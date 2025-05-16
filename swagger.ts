import swaggerJSDoc from "swagger-jsdoc"

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.4",
    info: {
      title: "INR Documentação da API",
      version: "0.1.0",
      description: "Documenbtação da API INR"
    },
    host: "http://localhost:3001",
    basePath: "/"
  },
  apis: ["./src/routes/*.ts"]
}
const swaggerDocs = swaggerJSDoc(options)
export default swaggerDocs
