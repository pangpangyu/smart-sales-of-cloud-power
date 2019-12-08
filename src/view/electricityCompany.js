import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';
import api from '../api/index';
import {
  KeepAlive
} from 'react-keep-alive';
/**
 * 售电公司
 */
export default class ElectricityCompany extends React.Component{
  constructor(props){
    super(props)
    let title = '公司信息'
    let search = false
    if(this.props.match.params.type === '1'){
      //电力用户信息
      title = '电力用户'
      search = true
    }else if(this.props.match.params.type === '2'){
      //发电厂信息
      title = '发电企业'
    }else if(this.props.match.params.type === '3'){
      //合作方信息
      title = '合作方'
    }else if(this.props.match.params.type === '4'){
      //售电公司信息
      title = '售电公司'
    }
    this.state = {
      title: title,
      type: this.props.match.params.type,
      search: search,
      companyList: [],
      pageIndex:0,
      total:0,
      noData:false
    }
  }
  componentDidMount(){
    const that = this
    if(that.state.type === '1'){
      that.getPowerUserList()
    }
  }
  //获取电力用户
  getPowerUserList = () => {
    const that = this
    let params = {
      "rowNumber": that.state.pageIndex,
      "pageSize": 10,
      "conditions": [
        {
          "operator": "",
          "name": "",
          "value": ""
        },
        {
          "operator": "",
          "name": "",
          "value": ""
        },
        {
          "operator": "",
          "name": "",
          "value": ""
        }
      ]
    }
    api.GetPowerUsersList(params).then(res => {
      if(res.status === 0){
        that.setState({
          companyList:res.data.rows,
          total:res.data.rowCount,
          noData: res.data.rowCount===0?true:false
        })
      }
    })
  }
  //售电
  sellingElectricity = () => {
    return (
      <div>
        <div className="title">
          <div><i className="iconfont iconshoudiangongsi"></i></div>
          <div>
            <p style={{fontSize:'23px',color:'#288dfd'}}>{ this.state.total }</p>
            <p style={{fontSize:'11px',color:'#999999',paddingTop:'4px'}}>售电公司总数</p>
          </div>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="electricityCompany-search">
          <div className="search-input">
            <input type="search" placeholder="搜客户名称"/>
          </div>
        </div>
      </div>
    )
  }
  //发电
  electricityGeneration = () => {
    return (
      <div>
        <div className="title">
          <div><i className="iconfont iconziyuan"></i></div>
          <div>
            <p style={{fontSize:'23px',color:'#288dfd'}}>{ this.state.total }</p>
            <p style={{fontSize:'11px',color:'#999999',paddingTop:'4px'}}>发电企业总数</p>
          </div>
        </div>
        <div style={{height:'10px'}}></div>
      </div>
    )
  }
  //合作方
  partners = () => {
    return (
      <div>
        <div className="title">
          <div><i className="iconfont iconziyuan1"></i></div>
          <div>
            <p style={{fontSize:'23px',color:'#288dfd'}}>{ this.state.total }</p>
            <p style={{fontSize:'11px',color:'#999999',paddingTop:'4px'}}>合作方总数</p>
          </div>
        </div>
        <div style={{height:'10px'}}></div>
        <div className="electricityCompany-search">
          <div className="search-input">
            <input type="search" placeholder="搜客户名称"/>
          </div>
        </div>
      </div>
    )
  }
  //电力用户
  powerUsers = () => {
    return (
      <div>
        <div className="title">
          <div style={{lineHeight:'39px'}}><img src={ require('../assets/img/img019.png') } style={{display:'inline-block',verticalAlign:'middle'}} alt=""/></div>
          <div>
            <p style={{fontSize:'23px',color:'#288dfd'}}>{ this.state.total }</p>
            <p style={{fontSize:'11px',color:'#999999',paddingTop:'4px'}}>用电企业总数</p>
          </div>
        </div>
        <div style={{height:'10px'}}></div>
      </div>
    )
  }
  render(){
    return(
      <div style={{minHeight:'100vh',background:'#f0f1f3'}} className="electricityCompany">
          <Header title={this.state.title} back={true} search={this.state.search}/>
          
            { this.state.type === '1' && this.powerUsers() }
            { this.state.type === '2' && this.electricityGeneration() }
            { this.state.type === '3' && this.partners() }
            { this.state.type === '4' && this.sellingElectricity() }
            
            { this.state.companyList && this.state.companyList.map(item => {
                    return  <div key={item.id}>
                              <div className="electricityCompany-item">
                                <Link to={`/electricityCompanyDetail/${this.state.type}/${item.id}`}>
                                  <div className="info">
                                    <p style={{fontSize:'15px',color:'#2b2a30',lineHeight:'18px'}}>{item.name}</p>
                                    <p style={{fontSize:'11px',color:'#94c0f4',paddingTop:'12px'}}><span style={{marginRight:'20px'}}>{item.followUpPerson || '-'}</span>{item.contactPersonMobile}</p>
                                  </div>
                                  <div className="address">
                                    { item.adminRegion }
                                  </div>
                                </Link>
                              </div>
                              <div style={{height:'10px',background:'#f0f1f3'}}></div>
                            </div>
            })} 
            { this.state.noData && <NoData /> }
      </div>
    )
  }
}

