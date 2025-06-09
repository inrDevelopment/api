import LeitorController from "../controllers/Leitor"
import BoletimRepository from "../repositories/Boletim"
import UserRepository from "../repositories/User"
import LeitorService from "../services/Leitor"

const boletimRepository = new BoletimRepository()
const userRepository = new UserRepository()
const leitorService = new LeitorService(boletimRepository, userRepository)
const leitorController = new LeitorController(leitorService)

export default leitorController
