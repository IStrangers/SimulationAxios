
function recordToUrlParams(record : Record<string,any>) {
  let params = ""
  for(let key in  Object.keys(record)) {
    params += `${(params === "" ? "" : "&")}${key}=${record[key]}`
  }
  return params
}

export {
  recordToUrlParams
}