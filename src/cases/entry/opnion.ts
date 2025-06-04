import OpinionController from "../controllers/Opnion"
import AuthorsRepository from "../repositories/Authors"
import ClientProductRepository from "../repositories/ClientProduct"
import OpinionRepository from "../repositories/Opnion"
import OpinionService from "../services/Opnion"

const opinionRepository = new OpinionRepository()
const clientProductRepository = new ClientProductRepository()
const authorsRepository = new AuthorsRepository()

const opinionService = new OpinionService(
  opinionRepository,
  clientProductRepository,
  authorsRepository
)

const opinionController = new OpinionController(opinionService)

export { opinionController }
