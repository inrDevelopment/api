import ClassifiersController from "../controllers/Classifiers"
import ActsRepository from "../repositories/Acts"
import AttachmentRepository from "../repositories/Attachment"
import BarRepository from "../repositories/Bar"
import ClassifiersRepository from "../repositories/Classifiers"
import ClientProductRepository from "../repositories/ClientProduct"
import DepartamentRepository from "../repositories/Departament"
import OrganRepository from "../repositories/Organ"
import ClassifiersService from "../services/Classifiers"

const classifiersRepository = new ClassifiersRepository()
const clientProductRepository = new ClientProductRepository()
const barsRepository = new BarRepository()
const organRepository = new OrganRepository()
const departamentRepository = new DepartamentRepository()
const actsRepository = new ActsRepository()
const attachmentRepository = new AttachmentRepository()

const classifiersService = new ClassifiersService(
  classifiersRepository,
  clientProductRepository,
  barsRepository,
  organRepository,
  departamentRepository,
  actsRepository,
  attachmentRepository
)

const classifiersController = new ClassifiersController(classifiersService)

export { classifiersController }
