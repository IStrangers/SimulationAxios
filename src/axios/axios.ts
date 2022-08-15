import parseHeaders from "parse-headers";
import { AxiosRequestConfig, AxiosResponse } from "./types";
import { recordToUrlParams } from "./utils";

class Axios {

  request<T>(config : AxiosRequestConfig) : Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config)
  }

  dispatchRequest<T>(config : AxiosRequestConfig) : Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve,reject) => {
      let { url,method,params } = config
      const request = new XMLHttpRequest()
      if(params && typeof params === "object") {
        params = recordToUrlParams(params)
        url += (url.indexOf("?") ? "&" : "?") + params
      }
      request.open(method,url,true)
      request.responseType = "json"
      request.onreadystatechange = function() {
        const { 
          readyState,status,statusText,
          response,responseText,getAllResponseHeaders 
        } = request
        switch(readyState) {
          case 4:
            if(status >= 200 && status < 300) {
              resolve({
                data: response ? response : responseText,
                status,
                statusText,
                headers: parseHeaders(getAllResponseHeaders()),
                config,
                request,
              })
            } else {
              reject()
            }
            break
        }
      }
    })
  }
}

export {
  Axios
}