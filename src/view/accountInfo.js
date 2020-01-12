import React from 'react';
import Header from '../components/header';
import { getDataQuery } from '../utils/index'
import api from '../api/index';
/**
 * 账户信息
 */
export default class AccountInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userInfo : {}
    }
  }
  componentWillMount(){
    this.getCompanyStaffTableData()
  }
  //账号管理
  getCompanyStaffTableData = () => {
    const that = this
    let params = `?participantId=${getDataQuery('pid')}`
    api.GetPowerUsersMemberManage(params).then(res => {
      if(res.status === 0){
        this.setState({
          userInfo:res.data.rows[getDataQuery('u')]
        })
      }
    })
}

  render(){
    return (
      <div>
        <Header title={'账户信息'} back={true} search={false}/>
        <div className="module-list">
          <div className="item">
            <div className="l">姓名</div>
            <div className="r">{this.state.userInfo.name}</div>
          </div>
          <div className="item">
            <div className="l">手机号码</div>
            <div className="r">{this.state.userInfo.mobilePhone}</div>
          </div>
          <div className="item">
            <div className="l">邮箱</div>
            <div className="r">{this.state.userInfo.mail}</div>
          </div>
          <div className="item">
            <div className="l">通讯地址</div>
            <div className="r">{this.state.userInfo.address}</div>
          </div>
          <div className="item">
            <div className="l">职务</div>
            <div className="r">{this.state.userInfo.userRole}</div>
          </div>
          <div className="item">
            <div className="l">角色</div>
            <div className="r">{this.state.userInfo.name}</div>
          </div>
          <div className="item">
            <div className="l">是否常用联系人</div>
            <div className="r">{this.state.userInfo.isContactPerson}</div>
          </div>
        </div>
      </div>
    )
  }
}
