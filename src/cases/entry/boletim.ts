import BoletimController from "../controllers/Boletim"
import BoletimRepository from "../repositories/Boletim"
import CanalRepository from "../repositories/Canal"
import ConfiguracoesRepository from "../repositories/Configuracoes"
import BoletimService from "../services/Boletim"

const boletimRepository = new BoletimRepository()
const configuracoesRepository = new ConfiguracoesRepository()
const canalRepository = new CanalRepository()

const boletimService = new BoletimService(
  boletimRepository,
  configuracoesRepository,
  canalRepository
)

const boletimController = new BoletimController(boletimService)
export { boletimController }
