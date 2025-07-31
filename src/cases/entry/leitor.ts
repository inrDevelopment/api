import LeitorController from "../controllers/Leitor"
import BoletimRepository from "../repositories/Boletim"
import LeitorService from "../services/Leitor"

const boletimRepository = new BoletimRepository()
const leitorService = new LeitorService(boletimRepository)
const leitorController = new LeitorController(leitorService)

export default leitorController
