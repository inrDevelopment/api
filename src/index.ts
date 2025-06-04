import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import swaggerUi from "swagger-ui-express"
import application from "./config/application"
import router from "./router"
import swaggerDocs from "./swagger"

const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, _, next) => {
  req.meta = {
    date: new Date(),
    method: req.method,
    start: new Date().getMilliseconds()
  }

  next()
})
app.use("/", router)
app.listen(application.port, async () => {
  let finalHost =
    application.env === "dev"
      ? `${application.host}:${application.port}`
      : `${application.host}`

  console.log(`Api ouvindo no endereço: http://${finalHost}`)
})
