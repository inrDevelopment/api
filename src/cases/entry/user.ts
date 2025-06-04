import UserController from "../controllers/User"
import UserRepository from "../repositories/User"
import UserService from "../services/User"

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export { userController }
