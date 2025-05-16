import QuestionsAnswersController from "../controllers/QuestionsAnswers"
import ClientProductRepository from "../repositories/ClientProduct"
import QuestionsAnswersRepository from "../repositories/QuestionsAnswers"
import QuestionsAnswersService from "../services/QuestionsAnswers"

const questionsAnswersRepository = new QuestionsAnswersRepository()
const clinetProductRepository = new ClientProductRepository()
const questionsAnswersService = new QuestionsAnswersService(
  questionsAnswersRepository,
  clinetProductRepository
)
const questionsAnswersController = new QuestionsAnswersController(
  questionsAnswersService
)

export { questionsAnswersController }
