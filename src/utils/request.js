import axios from 'axios'

var request = axios.create({})

request.defaults.baseURL = process.env === "product" ? "/" : "/"
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    let data = response.data
    return data
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default request