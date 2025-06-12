import express from "express"
import boletimRoutes from "./routes/boletimRoute"
import classifirsRoutes from "./routes/classifiersRoutes"
import descriptionRoute from "./routes/descriptionRoutes"
import homeRoutes from "./routes/homeRoutes"
import jurisprudenceRoutes from "./routes/jurisprudenceRoutes"
import legislationRoutes from "./routes/legislationRoutes"
import leitorRoutes from "./routes/leitorRoute"
import messagesEditorsRoutes from "./routes/messagesEditorsRoutes"
import newsRoutes from "./routes/newsRoutes"
import opinionRoutes from "./routes/opinionRoutes"
import pareceresRoutes from "./routes/pareceresRoutes"
import questionsAnswersRoutes from "./routes/questionsAnswersRoutes"
import recursoRoutes from "./routes/recursoRoute"
import supplementsRoutes from "./routes/supplementsRoutes"
import userRoutes from "./routes/userRoutes"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/home", homeRoutes)
router.use("/noticias", newsRoutes)
router.use("/jurisprudencia", jurisprudenceRoutes)
router.use("/legislacao", legislationRoutes)
router.use("/opniao", opinionRoutes)
router.use("/perguntas-respostas", questionsAnswersRoutes)
router.use("/mensagems-editores", messagesEditorsRoutes)
router.use("/pareceres", pareceresRoutes)
router.use("/classificadores", classifirsRoutes)
router.use("/descricao", descriptionRoute)
router.use("/suplementos", supplementsRoutes)
router.use("/boletim", boletimRoutes)
router.use("/leitor", leitorRoutes)
router.use("/recurso", recursoRoutes)

export default router
