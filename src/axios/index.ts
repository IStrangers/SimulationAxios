import { Axios } from "./axios"
import { AxiosInstance } from "./types"

function createInstance() : AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  Object.assign(instance,Axios.prototype,context)
  return instance as AxiosInstance
}

const axios = createInstance()

export {
  axios
}