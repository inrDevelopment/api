import LegislationController from "../controllers/Legislation"
import ClientProductRepository from "../repositories/ClientProduct"
import LegislationRepository from "../repositories/Legislation"
import LegislationService from "../services/Legislation"

const legislationRepository = new LegislationRepository()
const clientProductRepository = new ClientProductRepository()

const legislationService = new LegislationService(
  legislationRepository,
  clientProductRepository
)
const legislationController = new LegislationController(legislationService)

export { legislationController }
