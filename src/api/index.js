import request from '../utils/request'

const api = {
  login(params){
    return request.post('nuts/login',params)
  },
  findOneInfoByLocation(){
    return request.get('system/official/findOneInfoByLocation?location=index_picture')
  }
}

export default api
