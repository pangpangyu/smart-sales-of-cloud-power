import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
/**
 * 售电公司
 */
export default class ElectricityCompany extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      companyList: [
        { id:1, companyName:'信息技术股份有限公司信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市太原市' },
        { id:2, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' },
        { id:3, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' },
        { id:4, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' },
        { id:5, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' },
        { id:6, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' },
        { id:7, companyName:'信息技术股份有限公司', name:'张三', tel:'15987861235', address:'太原市' }
      ]
    }
  }
  render(){
    return(
      <div style={{minHeight:'100vh',background:'#f0f1f3'}} className="electricityCompany">
        <Header title={'售电公司'} back={true} search={false}/>
        <div className="title">
          <div><i className="iconfont iconshoudiangongsi"></i></div>
          <div>
            <p style={{fontSize:'23px',color:'#288dfd'}}>4335</p>
            <p style={{fontSize:'11px',color:'#999999',paddingTop:'4px'}}>售电公司总数</p>
          </div>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="electricityCompany-search">
          <div className="search-input">
            <input type="search" placeholder="搜客户名称"/>
          </div>
        </div>
        { this.state.companyList &&  this.state.companyList.map(item => {
          return  <div key={item.id}>
                    <div className="electricityCompany-item">
                      <Link to="/">
                        <div className="info">
                          <p style={{fontSize:'15px',color:'#2b2a30',lineHeight:'18px'}}>{item.companyName}</p>
                          <p style={{fontSize:'11px',color:'#94c0f4',paddingTop:'12px'}}><span style={{marginRight:'20px'}}>{item.name}</span>{item.tel}</p>
                        </div>
                        <div className="address">
                          { item.address }
                        </div>
                      </Link>
                    </div>
                    <div style={{height:'10px',background:'#f0f1f3'}}></div>
                  </div>
        })}
      </div>
    )
  }
}

