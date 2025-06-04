import SupplementsController from "../controllers/Supplements"
import SupplementsRepository from "../repositories/Supplements"
import TemasRepository from "../repositories/Temas"
import SupplementsService from "../services/Supplements"

const supplementsRepository = new SupplementsRepository()
const temasRepository = new TemasRepository()
const supplementsService = new SupplementsService(
  supplementsRepository,
  temasRepository
)
const supplementsController = new SupplementsController(supplementsService)

export { supplementsController }
