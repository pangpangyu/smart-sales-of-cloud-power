import axios from 'axios'
import { Toast } from 'antd-mobile';
import { getDataQuery } from './index';
var request = axios.create({})

request.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "/"
request.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
request.defaults.timeout = 60000
request.defaults.withCredentials = true
request.defaults.crossDomain = true
var loading = 1
request.interceptors.request.use(
  config => {
    if(window.sessionStorage.getItem('token')){
      config.headers['token'] =  window.sessionStorage.getItem('token')
    }else{
      config.headers['token'] = getDataQuery('token') || ''
    }
    let txt = '正在加载'
    if(config.url === 'nuts/file/upload'){
      txt = '正在上传'
    }
    if(loading === 1){
      Toast.loading(txt,60)
    }
    loading++
    if(config.url === 'nuts/file/upload'){
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    if(config.url === '/admin/system/checkInfoPublishStatus' || config.url === '/admin/system/updateInfoPublishStatus'){
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    // if(config.url.indexOf('?') > -1){
    //   config.url += '&ttt=' + new Date().getTime()
    // }else{
    //   config.url += '?ttt=' + new Date().getTime()
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    loading--
    if(loading === 1){
      //&& window.sessionStorage.getItem('userInfo')
      Toast.hide()
    }
    let data = response.data
    return data
  },
  error => {
    console.log(error)
    loading--
    Toast.hide()
    //Toast.info('系统异常，请联系开发人员',3)
    return Promise.reject(error)
  }
)

export default request