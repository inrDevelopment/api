import CursoController from "../controllers/Curso"
import CursoRepository from "../repositories/Curso"
import CursoService from "../services/Curso"

const cursoRepository = new CursoRepository()
const cursoService = new CursoService(cursoRepository)
const cursoController = new CursoController(cursoService)

export { cursoController }
