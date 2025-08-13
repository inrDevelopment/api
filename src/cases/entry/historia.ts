import HistoriaController from "../controllers/Historia"
import HistoriaRepository from "../repositories/Historia"
import HistoriaService from "../services/Historia"

const historiaRepository = new HistoriaRepository()
const historiaService = new HistoriaService(historiaRepository)
const historiaController = new HistoriaController(historiaService)

export { historiaController }
