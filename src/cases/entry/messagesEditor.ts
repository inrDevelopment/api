import MessagesEditorsController from "../controllers/MessagesEditors"
import MessagesEditorRepository from "../repositories/MessagesEditor"
import MessagesEditorsService from "../services/messagesEditors"

const messagesEditorRepository = new MessagesEditorRepository()
const messagesEditorsService = new MessagesEditorsService(
  messagesEditorRepository
)
const messagesEditorsController = new MessagesEditorsController(
  messagesEditorsService
)

export { messagesEditorsController }
