import request from '../utils/request'

export function login(params){
  return request.post('nuts/login',params)
}

