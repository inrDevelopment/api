import DescriptionController from "../controllers/Description"
import DescriptionRepository from "../repositories/Description"
import DescriptionService from "../services/Description"

const descriptionRepository = new DescriptionRepository()
const descriptionService = new DescriptionService(descriptionRepository)
const descriptionController = new DescriptionController(descriptionService)

export { descriptionController }
