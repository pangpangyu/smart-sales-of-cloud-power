import React from 'react';
import Header from '../components/header';
import Item from 'antd-mobile/lib/popover/Item';
/**
 * 账户信息
 */
export default class AccountInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userInfo : { id:2, name:'李四', c:false, email:'Test01@163.com', tel:'13546789898', account:'XXZHANGSAN', birthday:'12月31日' }
    }
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
            <div className="r">{this.state.userInfo.tel}</div>
          </div>
          <div className="item">
            <div className="l">邮箱</div>
            <div className="r">{this.state.userInfo.email}</div>
          </div>
          <div className="item">
            <div className="l">通讯地址</div>
            <div className="r">{this.state.userInfo.address}</div>
          </div>
          <div className="item">
            <div className="l">职务</div>
            <div className="r">{this.state.userInfo.name}</div>
          </div>
          <div className="item">
            <div className="l">角色</div>
            <div className="r">{this.state.userInfo.name}</div>
          </div>
          <div className="item">
            <div className="l">是否常用联系人</div>
            <div className="r">{this.state.userInfo.c ? '是':'否'}</div>
          </div>
        </div>
      </div>
    )
  }
}
