import parseHeaders from "parse-headers";
import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, Interceptor } from "./types";
import { recordToUrlParams } from "./utils";

class Axios<T> {

  public intercetors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse<T>>(),
  }

  request(config : AxiosRequestConfig) : Promise<AxiosRequestConfig | AxiosResponse<T>> {
    const chain : Array<Interceptor<AxiosRequestConfig | AxiosResponse<T>>> = [
      {
        onFulfilled: this.dispatchRequest
      }
    ]
    this.intercetors.request.interceptors.forEach((interceptor : Interceptor<AxiosRequestConfig>) => {
      chain.unshift(interceptor)
    })
    this.intercetors.response.interceptors.forEach((interceptor : Interceptor<AxiosResponse<T>>) => {
      chain.push(interceptor)
    })
    let promise : Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config)
    while(chain.length) {
      const { onFulfilled,onRejected } = chain.shift()!
      promise = promise.then(onFulfilled,onRejected)
    }
    return promise
  }

  dispatchRequest(config : AxiosRequestConfig) : Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve,reject) => {
      let { url,method,params,headers,data,timeout } = config
      const request = new XMLHttpRequest()
      if(params && typeof params === "object") {
        params = recordToUrlParams(params)
        url += (url.indexOf("?") ? "&" : "?") + params
      }
      request.open(method === undefined ? "get" : method,url,true)
      request.responseType = "json"
      if(headers) {
        for(let key in headers) {
          request.setRequestHeader(key,headers[key])
        }
      }

      if(timeout) {
        request.timeout = timeout
        request.ontimeout = function() {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }

      request.onerror = function() {
        reject("net::ERR_INTERNET_DISCONNECTED")
      }

      request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status !== 0) {
          if(request.status >= 200 && request.status < 300) {
            resolve({
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request,
            })
          } else {
            reject(`Error: Request failed with status code ${request.status}`)
          }
        }
      }

      let body = null
      if(data) {
        body = JSON.stringify(data)
      }
      request.send(body)
    })
  }
}

export {
  Axios
}