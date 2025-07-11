import UserController from "../controllers/User"
import BoletimRepository from "../repositories/Boletim"
import UserRepository from "../repositories/User"
import UserService from "../services/User"

const userRepository = new UserRepository()
const boletimRepository = new BoletimRepository()
const userService = new UserService(userRepository, boletimRepository)
const userController = new UserController(userService)

export { userController }
