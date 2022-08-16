type Methods = "get" | "GET" |
               "post" | "POST" |
               "put" | "PUT" |
               "delete" | "DELETE" |
               "option" | "OPTION"

interface AxiosRequestConfig {
  url: string
  method?: Methods
  params?: any
  headers?: Record<string,any>
  data?: Record<string,any>
  timeout?: number
}

interface OnFulfilled<T> {
  (value : any) : T | Promise<T>
}
interface OnRejected {
  (error : any) : any
}
interface Interceptor<T> {
  onFulfilled: OnFulfilled<T>
  onRejected?: OnRejected
}
class AxiosInterceptorManager<T> {
  public interceptors: Array<Interceptor<T>> = []

  use(onFulfilled : OnFulfilled<T>,onRejected? : OnRejected) : number {
    this.interceptors.push({
      onFulfilled,
      onRejected
    })
    return this.interceptors.length - 1;
  }

  eject(id : number) {
    if(id >= 0 && id < this.interceptors.length) {
      delete this.interceptors[id]
    }
  }
}

interface AxiosInstance {
  <T = any>(config : AxiosRequestConfig): Promise<AxiosResponse<T>>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}

interface AxiosResponse<T = any> {
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
  type Interceptor,
  AxiosInterceptorManager,
}