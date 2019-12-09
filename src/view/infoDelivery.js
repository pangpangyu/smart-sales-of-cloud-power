import React from 'react';
import { Link } from 'react-router-dom';
/**
 * 信息发布 
 * */

export default class InfoDelivery extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      list:[
        { id:1,title:'山西地方电力xxx1有限公司', time:'8分钟前', state:1 },
        { id:2,title:'山西地方电力xxx1有限公司', time:'8分钟前', state:2 },
        { id:3,title:'山西地方电力xxx1有限公司', time:'8分钟前', state:3 },
        { id:4,title:'山西地方电力xxx1有限公司', time:'8分钟前', state:2 },
        { id:5,title:'山西地方电力xxx1有限公司', time:'8分钟前', state:4 }
      ]
    }
  }

  gotoback = () => {
    window.history.go(-1)
  }

  render(){
    return(
      <div className="infoDelivey" style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <div className="header">
          <p className="header-title">信息发布</p>
          <div className="header-back" onClick={this.gotoback}><i className="iconfont iconfanhui"></i></div>
          <div className="header-search"><Link to="/"><i className="iconfont iconjia" style={{color:'#fff'}}></i></Link></div>
        </div>
        <div style={{height:'45px'}}></div>
        <div className="infoDelivey-search">
          <div className="search-input">
            <input type="search" placeholder="搜公告标题、内容、介绍"/>
          </div>
        </div>
        <div className="infoDelivey-list">
          { this.state.list && this.state.list.map(item => {
            return  <div className="item" key={item.id}>
                      <Link to={`/InfoDeliveyDetail/${item.id}`}>
                        <p style={{fontSize:'15px',color:'#2b2a30'}}>{item.title}</p>
                        <p style={{fontSize:'12px',color:'#999999',padding:'14px 0'}}>发布时间：<span style={{color:'#2b2a30'}}>{item.time}</span></p>
                        <p style={{fontSize:'12px',color:'#999999'}}>状态： 
                          <span className="btn">
                            { item.state === 1 && '已发布' }
                            { item.state === 2 && '草稿' }
                            { item.state === 3 && '审核通过' }
                            { item.state === 4 && '撤销发布' }
                          </span>
                        </p>
                      </Link>
                    </div>
          })}
        </div>
      </div>
    )
  }
}
