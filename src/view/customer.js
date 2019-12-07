import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
/**
 * 客户管理
 */

export default class customer extends React.Component{
  render(){
    return (
      <div style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <Header title={'客户管理'} back={true} search={false}/>
        <div className="customer-item">
          <Link to="/">
            <div className="icon icon1"></div>
            <div className="title">电力用户信息</div>
            <i className="iconfont iconyou"></i>
          </Link>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="customer-item">
          <Link to="/">
            <div className="icon"><i className="iconfont iconziyuan"></i></div>
            <div className="title">发电厂信息</div>
            <i className="iconfont iconyou"></i>
          </Link>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="customer-item">
          <Link to="/">
            <div className="icon"><i className="iconfont iconziyuan1"></i></div>
            <div className="title">合作方信息</div>
            <i className="iconfont iconyou"></i>
          </Link>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="customer-item">
          <Link to="/electricityCompany">
            <div className="icon"><i className="iconfont iconshoudiangongsi"></i></div>
            <div className="title">售电公司信息</div>
            <i className="iconfont iconyou"></i>
          </Link>
        </div>
      </div>
    )
  }
}
