import React from 'react';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';
import { getDataQuery } from '../utils/index';
import api from '../api/index';
/**
 * 账户管理
 */
export default class AccountManagement extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: this.props.id,
      list:[]
    }
  }

  componentDidMount(){
    this.getCompanyStaffTableData()
  }

  //电力用户账号管理
	getCompanyStaffTableData = () => {
		let params = `?participantId=${this.state.id}`
		api.GetPowerUsersMemberManage(params).then(res => {
			if (res.status === 0) {
				this.setState({
					list: res.data.rows
				})
			}
		})
	}

  render(){
    return(
      <div className="module-list2">
        { this.state.list && this.state.list.map((item,index) => {
          return  <div style={{marginBottom:'20px'}} key={item.id}>
                    <Link to={`/account/${item.id}?u=${index}&pid=${this.state.id}`}>
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
