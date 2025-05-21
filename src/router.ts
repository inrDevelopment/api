import express from "express"
import boletimRoutes from "./routes/boletimRoute"
import classifirsRoutes from "./routes/classifiersRoutes"
import descriptionRoute from "./routes/descriptionRoutes"
import homeRoutes from "./routes/homeRoutes"
import jurisprudenceRoutes from "./routes/jurisprudenceRoutes"
import legislationRoutes from "./routes/legislationRoutes"
import messagesEditorsRoutes from "./routes/messagesEditorsRoutes"
import newsRoutes from "./routes/newsRoutes"
import opinionRoutes from "./routes/opinionRoutes"
import pareceresRoutes from "./routes/pareceresRoutes"
import questionsAnswersRoutes from "./routes/questionsAnswersRoutes"
import supplementsRoutes from "./routes/supplementsRoutes"
import userRoutes from "./routes/userRoutes"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/home", homeRoutes)
router.use("/news", newsRoutes)
router.use("/jurisprudence", jurisprudenceRoutes)
router.use("/legislation", legislationRoutes)
router.use("/opinion", opinionRoutes)
router.use("/questions-answers", questionsAnswersRoutes)
router.use("/messages-editors", messagesEditorsRoutes)
router.use("/pareceres", pareceresRoutes)
router.use("/classificadores", classifirsRoutes)
router.use("/description", descriptionRoute)
router.use("/supplements", supplementsRoutes)
router.use("/boletim", boletimRoutes)

export default router
