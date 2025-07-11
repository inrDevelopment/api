import bodyParser from "body-parser"
import cors from "cors"
import express, { Application } from "express"
import swaggerUi from "swagger-ui-express"
import application from "../../config/application"
import swaggerDocs from "../../documentation"
import router from "../../router"

export default class Server {
  private app: Application

  constructor() {
    this.app = express()
  }

  start(): void {
    try {
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
      this.app.use(cors())
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
