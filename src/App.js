import React from 'react';
import './assets/css/app.less';
import { setCookies } from './utils/index';
import { getDataQuery } from './utils/index';
import api from './api/index';
import { Toast } from 'antd-mobile';

class App extends React.Component {
  componentDidMount() {
    if(process.env.NODE_ENV === 'development'){
      setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
    }else{
      let companyName = getDataQuery('companyName')
      let token = getDataQuery('token')
      if(companyName === ''){
        Toast.fail('公司名称不能为空',0)
        return false
      }
      if(token === ''){
        Toast.fail('token不能为空',0)
        return false
      }
      let params = {
        companyName:companyName,
        token:token,
        loginType:'xiaohuiApp'
      }
      api.login(params).then(res => {
        if(res.status === 0){
          setCookies('PLAY_SESSION', res.data.token)
        }else{
          Toast.fail(res.message,0)
        }
      })
    }
    
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
