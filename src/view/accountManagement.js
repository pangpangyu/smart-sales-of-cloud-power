import React from 'react';
import { Link } from 'react-router-dom';
/**
 * 账户管理
 */
export default class AccountManagement extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div className="module-list2">
        { this.props.userList && this.props.userList.map((item,index) => {
          return  <div style={{marginBottom:'20px'}} key={item.id}>
                    <Link to={`/account/${item.id}?u=${index}&pid=${this.props.participantId}`}>
                      <div className="title" style={{fontSize:'15px',color:'#2b2a30',padding:'12px 15px'}}>{item.name} {item.isContactPerson === '是' ? '(常)':''} </div>
                      <div className="item">
                        <div className="l">邮箱</div>
                        <div className="r">{item.mail}</div>
                      </div>
                      <div className="item">
                        <div className="l">手机</div>
                        <div className="r">{item.mobilePhone}</div>
                      </div>
                      <div className="item">
                        <div className="l">账号</div>
                        <div className="r">{item.account}</div>
                      </div>
                      <div className="item">
                        <div className="l">生日</div>
                        <div className="r">{item.birthday}</div>
                      </div>
                    </Link>
                  </div>
        }) }
      </div>
    )
  }
}
