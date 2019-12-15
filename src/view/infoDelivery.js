import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api/index';
import NoData from '../components/noData';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';
/**
 * 信息发布 
 * */

export default class InfoDelivery extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      list:[],
      pageIndex:0,
      pageSize:10,
      keyword:'',
      total:10000,
      isNotData: '1',
      isPullUpLoad:true
    }
  }

  componentDidMount(){
    this.scrollObj = this.refs.scroll.getScrollObj()
    this.getListData()
  }

  getListData = () => {
    const that = this
    let params = {
      "rowNumber":that.state.pageIndex,
      "pageSize":that.state.pageSize,
      "orders":[],
      "conditions":[{"operator":"like","name":"keyword","value":that.state.keyword}]
    }
    api.GetInfoPublishData(params).then(res => {
      if(res.status === 0){
        that.setState({
          list:[...that.state.list,...res.data.rows],
          total:res.data.rowCount,
          isNotData: res.data.rowCount == 0 ? '0' : '1'
        })
      }
    })
  }

  gotoback = () => {
    window.history.go(-1)
  }

  handelChange = (e) => {
    this.setState({
      keyword:e.target.value
    })
  }

  getSearchTxt = (e) => {
    e.preventDefault();
    //搜索事件
    this.setState({
      pageIndex:0
    },() => {
      this.getListData()
    })
  }

  loadMoreData = () => {
    const that = this
    let pageIndex = that.state.pageIndex + 1
    return new Promise((resolve,reject) => {
      if(pageIndex * that.state.pageSize <= that.state.total){
        let params = {
          "rowNumber":pageIndex,
          "pageSize":that.state.pageSize,
          "orders":[],
          "conditions":[{"operator":"like","name":"keyword","value":that.state.keyword}]
        }
        api.GetInfoPublishData(params).then(res => {
          if(res.status === 0){
            that.setState({
              list:[...that.state.list,...res.data.rows],
              total:res.data.rowCount,
              isNotData: res.data.rowCount == 0 ? '0' : '1',
              pageIndex:pageIndex
            })
            resolve()
          }else{
            reject()
          }
        })
      }else{
        resolve()
        this.setState({
          isPullUpLoad: false,
        })
      }
    })
  }

  render(){
    return(
      // overflowY:'scroll'
      <div className="infoDelivey" style={{Height:'100%',background:'#f0f1f3',overflow:'hidden'}}>
        <div className="header">
          <p className="header-title">信息发布</p>
          <div className="header-back" onClick={this.gotoback}><i className="iconfont iconfanhui"></i></div>
          <div className="header-search"><Link to="/infoDeliveyAdd"><i className="iconfont iconjia" style={{color:'#fff',fontSize:'15px'}}></i></Link></div>
        </div>
        <Scroll 
          ref='scroll'
          pullUpLoad
          pullUpLoadMoreData={this.loadMoreData}
          isPullUpTipHide={ this.state.pageIndex === 0 }
          bounce={false}
          click={true}>
          <div style={{height:'45px'}}></div>
          <div className="infoDelivey-search">
            <div className="search-input">
              <form onSubmit={(e) => this.getSearchTxt(e)}>
                <input type="search" onChange={this.handelChange} placeholder="搜公告标题、内容、介绍"/>
              </form>
            </div>
          </div>
          <div className="infoDelivey-list">
            { this.state.list.length > 0 && this.state.list.map((item,index) => {
              return  <div className="item" key={index}>
                        <Link to={`/InfoDeliveyDetail/${item.id}`}>
                          <p style={{fontSize:'15px',color:'#2b2a30',lineHeight:'18px'}}>{item.title}</p>
                          <p style={{fontSize:'12px',color:'#999999',padding:'14px 0'}}>发布时间：<span style={{color:'#2b2a30'}}>{item.createTime}</span></p>
                          <p style={{fontSize:'12px',color:'#999999'}}>状态： 
                            <span className="btn">
                              { item.publishStatus }
                            </span>
                          </p>
                        </Link>
                      </div>
            })}
            { this.state.isNotData === '0' && <NoData/> }
            {/* { (this.state.isNotData !== '0' && !this.state.isPullUpLoad) && <div style={{textAlign:"center",background:'#f0f1f3',lineHeight:'40px'}}>已全部加载</div> } */}
          </div>
        </Scroll>
      </div>
    )
  }
}
