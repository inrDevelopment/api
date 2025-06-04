import NewsController from "../controllers/News"
import NewsRepository from "../repositories/News"
import NewsService from "../services/News"

const newsRepository = new NewsRepository()
const newService = new NewsService(newsRepository)
const newsController = new NewsController(newService)

export default newsController
