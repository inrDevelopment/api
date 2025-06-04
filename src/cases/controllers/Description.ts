//#region Imports
import { defaultResponse } from "../core/defaultResponse"
import {
  descriptionByIdControllerProps,
  descriptionByIdValidation
} from "../schemas/descriptionById"
import DescriptionService from "../services/Description"
//#endregion Imports

export default class DescriptionController {
  constructor(private descriptionService: DescriptionService) {}

  async get(params: descriptionByIdControllerProps): Promise<defaultResponse> {
    try {
      const validation = await descriptionByIdValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.descriptionService.get(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
