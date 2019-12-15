import axios from 'axios'
import { Toast } from 'antd-mobile';
var request = axios.create({})

request.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "/"
request.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
request.defaults.timeout = 60000
request.defaults.withCredentials = true
request.defaults.crossDomain = true
var loading = false
request.interceptors.request.use(
  config => {
    if(!loading){
      Toast.loading('Loading...',0);
      loading = true
    }
    if(config.url === 'nuts/file/upload'){
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    Toast.hide()
    loading = false
    let data = response.data
    return data
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default request