import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import { AliveScope } from 'react-activation';

/**
 * 公司公告列表
 * 消息提醒列表
 */
export default class NewList extends React.Component{
  constructor(props){
    super(props)
    let title = "消息"
    if(this.props.match.params.type === '1'){
      title = '公司公告'
    }else if(this.props.match.params.type === '2'){
      title = '消息提醒'
    }
    this.state = {
      title:title,
      type:this.props.match.params.type || 0,
      companyNewList:[
        { id: 1,title:'山西电力市场合同电量转让交易公告山西电力市场合同电量转让交易公告', time:'8分钟前', isNew: true },
        { id: 2,title:'山西电力市场合同电量转让交易公告', time:'20分钟前', isNew: true },
        { id: 3,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false },
        { id: 4,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false },
        { id: 5,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false },
        { id: 6,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false },
        { id: 7,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false },
        { id: 8,title:'山西电力市场合同电量转让交易公告', time:'2019-12-03', isNew: false }
      ],
      search:''
    }
  }

  getSearchData = (val) => {
    this.setState({
      search:val
    })
  }

  getSearchTxt = (e) => {
    e.preventDefault();
    //搜索事件
  }

  render(){
    return (
      <div style={{background:'#fff'}}>
        <Header title={this.state.title} back={true} search={false}/>
        <div className="company-search-view">
          <div className="company-search">
            <form onSubmit={(e) => this.getSearchTxt(e)}>
              <input type="search" placeholder="搜公告标题、内容、介绍" onChange={(e) => this.getSearchData(e.target.value)}/>
            </form>
          </div>
        </div>
        <div className="company-new-list" style={{paddingTop:'74px'}}>
          <AliveScope>
            { this.state.companyNewList.map(item => {
                return  <div key={item.id} className="item">
                          <Link to={`/newDetaile/${this.state.type}/${item.id}`}>
                            <div className="info">
                              <div className="title">{item.title}</div>
                              <div className="time">发布时间：{item.time}</div>
                            </div>
                            <div className="new">
                              { item.isNew && <img src={require('../assets/img/img018.png')} style={{width:'26px',height:'auto'}} alt="new"/> }
                              <i className="iconfont iconyou"></i>
                            </div>
                          </Link>
                          <div style={{background:'#f0f1f3',height:'11px'}}></div>
                        </div>
            }) }
          </AliveScope>
        </div>
      </div>
    )
  }
}
