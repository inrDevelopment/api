import RecursoController from "../controllers/Recurso"
import RecursoRepository from "../repositories/Recurso"
import RecursoService from "../services/Recurso"

const recursoRepository = new RecursoRepository()
const recursoService = new RecursoService(recursoRepository)
const recursoController = new RecursoController(recursoService)

export { recursoController }
