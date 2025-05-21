import BoletimController from "../controllers/Boletim"
import BoletimRepository from "../repositories/Boletim"
import ConfiguracoesRepository from "../repositories/Configuracoes"
import BoletimService from "../services/Boletim"

const boletimRepository = new BoletimRepository()
const configuracoesRepository = new ConfiguracoesRepository()

const boletimService = new BoletimService(
  boletimRepository,
  configuracoesRepository
)

const boletimController = new BoletimController(boletimService)
export { boletimController }
