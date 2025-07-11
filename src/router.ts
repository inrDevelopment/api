//#region imports
import express from "express"
import boletim from "./routes/boletim"
import classifier from "./routes/classifier"
import description from "./routes/description"
import home from "./routes/home"
import jurisprudence from "./routes/jurisprudence"
import legislation from "./routes/legislation"
import leitor from "./routes/leitor"
import messagesEditors from "./routes/messagesEditors"
import news from "./routes/news"
import opinion from "./routes/opinion"
import pareceres from "./routes/pareceres"
import questionsAnswers from "./routes/questionsAnswers"
import recurso from "./routes/recurso"
import supplements from "./routes/supplements"
import user from "./routes/user"
//#endregion Imports

const router = express.Router()

router.use("/seguranca", user)
router.use("/home", home)
router.use("/noticia", news)
router.use("/jurisprudencia", jurisprudence)
router.use("/legislacao", legislation)
router.use("/opniao", opinion)
router.use("/pergunta-resposta", questionsAnswers)
router.use("/mensagem-editor", messagesEditors)
router.use("/parecer", pareceres)
router.use("/classificador", classifier)
router.use("/descricao", description)
router.use("/suplemento", supplements)
router.use("/boletim", boletim)
router.use("/leitor", leitor)
router.use("/recurso", recurso)

export default router
