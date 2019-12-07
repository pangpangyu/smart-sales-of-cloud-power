import request from '../utils/request'

const api = {
  login(params){
    return request.post('nuts/login',params)
  },
  //首页轮播图列表
  findOneInfoByLocation(params){
    return request.get('system/official/findOneInfoByLocation?location=index_picture')
  },
  //消息提醒
  systemMessageListData(params){
    return request.post('systemMessageListData?hasHandled=false')
  }
}

export default api
