import JurisprudenceController from "../controllers/Jurisprudence"
import ClientProductRepository from "../repositories/ClientProduct"
import JurisprudenceRepository from "../repositories/Jurisprudence"
import JurisprudenceService from "../services/Jurisprudence"

const clientProductRepository = new ClientProductRepository()
const jurisprudenceRepository = new JurisprudenceRepository()
const jurisprudenceService = new JurisprudenceService(
  jurisprudenceRepository,
  clientProductRepository
)
const jurisprudenceController = new JurisprudenceController(
  jurisprudenceService
)

export { jurisprudenceController }
