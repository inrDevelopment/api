import PareceresController from "../controllers/Pareceres"
import ClientProductRepository from "../repositories/ClientProduct"
import PareceresRepository from "../repositories/Pareceres"
import PareceresService from "../services/Pareceres"

const pareceresRepository = new PareceresRepository()
const clientProductRepository = new ClientProductRepository()

const pareceresService = new PareceresService(
  pareceresRepository,
  clientProductRepository
)

const pareceresController = new PareceresController(pareceresService)

export { pareceresController }
