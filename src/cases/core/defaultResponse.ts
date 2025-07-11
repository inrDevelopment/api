export type defaultResponse<T = any> = {
  success: boolean
  data?: T
  message?: string
}
