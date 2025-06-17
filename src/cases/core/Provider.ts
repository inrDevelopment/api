import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

type defaultResponse<T = any> = {
  success: boolean
  message?: string
  data?: T
}

export default class Provider {
  private instance: AxiosInstance = axios.create()
  protected fetch: {
    get: <T = any>(params: {
      url: string
      config?: AxiosRequestConfig<any>
    }) => Promise<defaultResponse<T>>
    post: <T = any>(params: {
      url: string
      body?: any
      config?: AxiosRequestConfig<any>
    }) => Promise<defaultResponse<T>>
    put: <T = any>(params: {
      url: string
      body?: any
      config?: AxiosRequestConfig<any>
    }) => Promise<defaultResponse<T>>
    delete: <T = any>(params: {
      url: string
      config?: AxiosRequestConfig<any>
    }) => Promise<defaultResponse<T>>
  }

  constructor() {
    this.fetch = {
      get: async <T = any>(params: {
        url: string
        config?: AxiosRequestConfig<any>
      }): Promise<defaultResponse<T>> => {
        try {
          const responseHttpRequest: AxiosResponse<defaultResponse<T>> =
            await this.instance.get(params.url, params.config)

          if (responseHttpRequest.status === 200) {
            if (responseHttpRequest.data.data) {
              return {
                success: responseHttpRequest.data.success,
                data: responseHttpRequest.data.data,
                message: responseHttpRequest.data.message
              }
            } else {
              return {
                success: responseHttpRequest.data.success,
                message: responseHttpRequest.data.message
              }
            }
          } else {
            return {
              success: false,
              message: responseHttpRequest.data.message
            }
          }
        } catch (error: any) {
          return {
            success: false,
            message: error.message
          }
        }
      },
      post: async <T = any>(params: {
        url: string
        body?: any
        config?: AxiosRequestConfig<any>
      }): Promise<defaultResponse<T>> => {
        try {
          const responseHttpRequest: AxiosResponse<defaultResponse<T>> =
            await this.instance.post(params.url, params.body, params.config)

          if (responseHttpRequest.status === 200) {
            if (responseHttpRequest.data.data) {
              return {
                success: responseHttpRequest.data.success,
                data: responseHttpRequest.data.data,
                message: responseHttpRequest.data.message
              }
            } else {
              return {
                success: responseHttpRequest.data.success,
                message: responseHttpRequest.data.message
              }
            }
          } else {
            return {
              success: false,
              message: responseHttpRequest.data.message
            }
          }
        } catch (error: any) {
          return {
            success: false,
            message: error.message
          }
        }
      },
      put: async <T = any>(params: {
        url: string
        body?: any
        config?: AxiosRequestConfig<any>
      }): Promise<defaultResponse<T>> => {
        try {
          const responseHttpRequest: AxiosResponse<defaultResponse<T>> =
            await this.instance.put(params.url, params.body, params.config)

          if (responseHttpRequest.status === 200) {
            if (responseHttpRequest.data.data) {
              return {
                success: responseHttpRequest.data.success,
                data: responseHttpRequest.data.data,
                message: responseHttpRequest.data.message
              }
            } else {
              return {
                success: responseHttpRequest.data.success,
                message: responseHttpRequest.data.message
              }
            }
          } else {
            return {
              success: false,
              message: responseHttpRequest.data.message
            }
          }
        } catch (error: any) {
          return {
            success: false,
            message: error.message
          }
        }
      },
      delete: async <T = any>(params: {
        url: string
        config?: AxiosRequestConfig<any>
      }): Promise<defaultResponse<T>> => {
        try {
          const responseHttpRequest: AxiosResponse<defaultResponse> =
            await this.instance.delete(params.url, params.config)

          if (responseHttpRequest.status === 200) {
            if (responseHttpRequest.data.data) {
              return {
                success: responseHttpRequest.data.success,
                data: responseHttpRequest.data.data,
                message: responseHttpRequest.data.message
              }
            } else {
              return {
                success: responseHttpRequest.data.success,
                message: responseHttpRequest.data.message
              }
            }
          } else {
            return {
              success: false,
              message: responseHttpRequest.data.message
            }
          }
        } catch (error: any) {
          return {
            success: false,
            message: error.message
          }
        }
      }
    }
  }
}
