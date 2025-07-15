import awsLib from "aws-sdk"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import sns from "../../config/sns"

type defaultResponse<T = any> = {
  success: boolean
  message?: string
  data?: T
}

export default class Provider {
  private instance: AxiosInstance
  private snsTool: awsLib.SNS

  constructor() {
    awsLib.config.update({
      region: sns.region,
      accessKeyId: sns.accesskeyid,
      secretAccessKey: sns.secretaccesskey
    })

    this.instance = axios.create()
    this.snsTool = new awsLib.SNS()
  }

  get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.get(url, config)

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message
          }
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message
          }
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  post = async <T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.post(url, body, config)

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message
          }
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message
          }
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  put = async <T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.put(url, body, config)

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message
          }
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message
          }
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  del = async <T = any>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.delete(url, config)

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message
          }
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message
          }
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  sms = async (
    phone: string,
    msg: string
  ): Promise<{ success: boolean; msg?: string }> => {
    try {
      await this.snsTool.publish({ Message: msg, PhoneNumber: phone }).promise()
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        msg: error.message
      }
    }
  }
}
