import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import swaggerUi from "swagger-ui-express"
import application from "./config/application"
import swaggerDocs from "./documentation"
import router from "./router"

const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", router)

app.listen(application.port, async () => {
  console.log(
    `Api ativa no endereço: ${
      application.env === "prod"
        ? `${application.host.prod}`
        : `${application.host.dev}:${application.port}`
    }`
  )
})
