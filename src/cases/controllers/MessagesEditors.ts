import { defaultResponse } from "../core/defaultResponse"
import {
  messagesEditorsByIdControllerProps,
  messagesEditorsByIdValidation
} from "../schemas/messagesEditorsById"
import {
  messagesEditorsHomeControllerProps,
  messagesEditorsHomeValidation
} from "../schemas/messagesEditorsHome"
import MessagesEditorsService from "../services/MessagesEditors"

export default class MessagesEditorsController {
  constructor(private messagesEditorsService: MessagesEditorsService) {}

  async messagesEditorsContent(
    params: messagesEditorsHomeControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await messagesEditorsHomeValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.messagesEditorsService.messagesEditorsContent(
        validation.data
      )
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getMessagesEditorsById(
    params: messagesEditorsByIdControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await messagesEditorsByIdValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.messagesEditorsService.getMessagesEditorsById(
        validation.data
      )
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
