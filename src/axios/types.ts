type Methods = "get" | "GET" |
               "post" | "POST" |
               "put" | "PUT" |
               "delete" | "DELETE" |
               "option" | "OPTION"

interface AxiosRequestConfig {
  url: string
  method: Methods
  params: any
}

interface AxiosInstance {
  <T>(config : AxiosRequestConfig): Promise<T>
}

interface AxiosResponse<T> {
  data: T
  status: number
  statusText: string
  headers?: Record<string,any>
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}

export {
  type Methods,
  type AxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
}