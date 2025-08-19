import axios, { AxiosError } from "axios"
import { JobsOptions } from "bullmq"
import CanalRepository from "../cases/repositories/Canal"
import application from "../config/application"
import { NoDataError } from "../lib/fetch"

export default {
  key: "notificacaoNovoItemMobile",
  async handle(data: any) {
    const message = {
      to: data.token,
      title: data.title,
      body: data.body
    }
    const canalRepository = new CanalRepository()

    try {
      const response = await axios.post<{
        data?: {
          id?: string
          status?: "ok" | "error"
          message?: string
          details?: {
            error?:
              | "DeviceNotRegistered"
              | "MessageTooBig"
              | "MessageRateExceeded"
              | "MismatchSenderId"
              | "InvalidCredentials"
          }
        }
      }>(application.expo, message, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate"
        }
      })

      if (!response.data.data) throw new NoDataError("Response sem data")
      if (response.data.data.status === "ok") {
        console.log("Enviada")
        return
      }

      if (response.data.data.status === "error") {
        await canalRepository.deleteMember({ token: data.token })
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status > 399 && error.response.status <= 499) {
            await canalRepository.deleteMember({ token: data.token })

            throw new Error(`Expo not Error: ${error.response.status}`)
          } else if (
            error.response.status > 499 &&
            error.response.status <= 599
          ) {
            throw new Error(`Expo server Error: ${error.response.status}`)
          }
        } else if (error.request) {
          throw new Error("Erro de requisição: Network Error")
        } else {
          console.error("Error:", error.message)
          return
        }
      }

      if (error instanceof NoDataError) {
        console.error("No data in response")
        return
      }
    }
  },
  options: {
    delay: 100
  } as JobsOptions
}
