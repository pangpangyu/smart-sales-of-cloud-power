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
    setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    window.sessionStorage.setItem('userInfo','64')
    // if(process.env.NODE_ENV === 'development'){
    //   setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    //   window.sessionStorage.setItem('id','10')
    //   window.sessionStorage.setItem('department','14')
    //   window.sessionStorage.setItem('position','21')
    //   window.sessionStorage.setItem('userInfo','64')
    // }else{
    //   let companyName = getDataQuery('companyName') || '亦云信息'
    //   let token = getDataQuery('token') || ''
    //   let params = {
    //     companyName:companyName,
    //     token:token,
    //     loginType:'xiaohuiApp'
    //   }
    //   api.login(params).then(res => {
    //     if(res.status === 0){
    //       setCookies('PLAY_SESSION', res.data.token)
    //       // window.sessionStorage.setItem('id',res.data.id)
    //       window.sessionStorage.setItem('department',res.data.departmentId)
    //       window.sessionStorage.setItem('position',res.data.departmentId)
    //       window.sessionStorage.setItem('userInfo',res.data.userInfoId)
    //     }else{
    //       Toast.fail(res.message,0)
    //     }
    //   }).catch(e => {
    //     Toast.fail('存在非法参数，请联系技术人员处理',0)
    //   })
    // }
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
