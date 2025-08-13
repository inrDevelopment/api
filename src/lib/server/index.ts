import bodyParser from "body-parser"
import cors from "cors"
import express, { Application } from "express"
import swaggerUi from "swagger-ui-express"
import application from "../../config/application"
import swaggerDocs from "../../documentation"
import router from "../../router"

const allowedOrigins = [
  "http://localhost:3000",
  "https://api.publicacoesinr.com.br"
]

export default class Server {
  private app: Application

  constructor() {
    this.app = express()
  }

  start(): void {
    try {
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
      this.app.use(
        cors({
          origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if (allowedOrigins.includes(origin)) return callback(null, true)
            return callback(new Error("Origem não permitida pelo CORS"))
          },
          credentials: true
        })
      )
      this.app.use(bodyParser.json())
      this.app.use(bodyParser.urlencoded({ extended: true }))
      this.app.use("/", router)
      this.app.listen(application.port, async () => {
        console.log(
          `Api ouvindo em: ${
            application.env === "prod"
              ? `${application.host.prod}`
              : `${application.host.dev}:${application.port}`
          }`
        )
      })
    } catch (error: any) {
      console.log(`erro: [${error.message}]`)
    }
  }
}
