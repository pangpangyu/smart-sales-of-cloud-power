import React from 'react';
import './assets/css/app.less';
import { setCookies } from './utils/index';
import { getDataQuery } from './utils/index';
import api from './api/index';
import { Toast } from 'antd-mobile';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin:false
    }
  }
  componentDidMount() {
    // setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    // window.sessionStorage.setItem('userInfo','64')
    // if(process.env.NODE_ENV !== 'development'){
    //   setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    //   let userInfo = {
    //     "positionId": "21",
    //     "accountName": "APP测试",
    //     "departmentId": "14",
    //     "account": "appusr",
    //     "token": "appusr",
    //     "userInfoId": "64"
    //   }
    //   let systemUser={
    //     "departmentName":"总经理办公室",
    //     "positionName":"总经理",
    //     "systemUserName":"APP测试",
    //   }
    //   let info = JSON.stringify(userInfo)
    //   let info2=JSON.stringify(systemUser)
    //   window.sessionStorage.setItem('userInfo',info)
    //   window.sessionStorage.setItem('systemUser',info2)
    //   window.sessionStorage.setItem('token','4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    // }else{
    //   let companyName = getDataQuery('companyName') || '亦云信息'
    //   let token = getDataQuery('token') || ''
    //   let params = {
    //     companyName:companyName,
    //     token:token,
    //     loginType:'xiaohuiApp'
    //   }
    //   if(!window.sessionStorage.getItem('userInfo')){
    //     api.login(params).then(res => {
    //       if(res.status === 0){
    //         setCookies('PLAY_SESSION', res.data.token)
    //         window.sessionStorage.setItem('token',res.data.token)
    //         let userInfo = {
    //           "positionId": res.data.positionId || 0,//0,
    //           "accountName": res.data.accountName || "",//"APP测试",
    //           "departmentId": res.data.departmentId || "",//"14",
    //           "account": res.data.account || "",//"appusr",
    //           "token": res.data.token || "",//"appusr",
    //           "userInfoId": res.data.userInfoId || "",//"64"
    //         }
    //         let info = JSON.stringify(userInfo)
    //         window.sessionStorage.setItem('userInfo',info)
    //         this.FindSystemUser(res.data.userInfoId)
    //       }else{
    //         Toast.fail(res.message,0)
    //       }
    //     }).catch(e => {
    //       Toast.fail('存在非法参数，请联系技术人员处理',0)
    //     })
    //   }
    // }
  }
  FindSystemUser=(id)=>{
    let params={
      id:id
    }
    api.FindSystemUser(params).then(res=>{
      let systemUser={
        "departmentName":res.data.systemUserInfo.position.department.departmentName,
        "positionName":res.data.systemUserInfo.position.positionName,
        "systemUserName":res.data.systemUserInfo.systemUserName,
      }
      let info2=JSON.stringify(systemUser)
      window.sessionStorage.setItem('systemUser',info2)
    })
  }
  render() {
    return (
      <div>
        {/* { this.state.isLogin && this.props.children} */}
        {this.props.children}
      </div>
    )
  }
}

export default App;
