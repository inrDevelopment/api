import { defaultResponse } from "../core/defaultResponse"
import {
  painelAuthControllerProps,
  painelAuthValidation
} from "../schemas/painelAuth"
import {
  siteAuthControllerProps,
  siteAuthValidation
} from "../schemas/siteAuth"
import type UserService from "../services/User"

export default class UserController {
  constructor(private userService: UserService) {}

  async siteAuth(params: siteAuthControllerProps): Promise<defaultResponse> {
    try {
      const validation = await siteAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.siteAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async painelAuth(
    params: painelAuthControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await painelAuthValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.painelAuth(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
