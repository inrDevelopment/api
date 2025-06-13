import RecursoController from "../controllers/Recurso"
import RecursoRepository from "../repositories/Recurso"
import UserRepository from "../repositories/User"
import RecursoService from "../services/Recurso"

const recursoRepository = new RecursoRepository()
const userRepository = new UserRepository()
const recursoService = new RecursoService(recursoRepository, userRepository)
const recursoController = new RecursoController(recursoService)

export { recursoController }
