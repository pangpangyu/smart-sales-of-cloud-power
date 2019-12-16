import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';
import api from '../api/index';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';

/**
 * 售电公司
 */
export default class ElectricityCompany extends React.Component {
  constructor(props) {
    super(props)
    let title = '公司信息'
    if (this.props.match.params.type === '1') {
      //电力用户信息
      title = '电力用户'
    } else if (this.props.match.params.type === '2') {
      //发电厂信息
      title = '发电企业'
    } else if (this.props.match.params.type === '3') {
      //合作方信息
      title = '合作方'
    } else if (this.props.match.params.type === '4') {
      //售电公司信息
      title = '售电公司'
    }
    this.state = {
      title: title,
      type: this.props.match.params.type,
      companyList: [],
      pageIndex: 0,
      total: 0,
      noData: false,
      pageSize: 10,
      keyword:''
    }
  }


  componentWillMount() {
    const that = this
    if (that.state.type === '1') {
      that.getPowerUserList()
    } else if (that.state.type === '2') {
      that.getElectricityGenerationList()
    } else if (that.state.type === '3') {
      that.getPartnersList()
    } else if (that.state.type === '4') {
      that.getSellingElectricityList()
    }
  }
  //获取电力用户数据
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
      if (res.status === 0) {
        that.setState({
          companyList: [...this.state.companyList, ...res.data.rows],
          total: res.data.rowCount,
          noData: res.data.rowCount === 0 ? true : false
        })
      }
    })
  }
  //获取发电企业数据
  getElectricityGenerationList = () => {
    const that = this
    let params = { "rowNumber": that.state.pageIndex, "pageSize": 10, "conditions": [{ "name": "name", "operator": "%", "value": this.state.keyword }] }
    api.GetPowerPlantList(params).then(res => {
      if (res.status === 0) {
        res.data.rows.map(item => {
          // item.name = item.conglomerate
          item.followUpPerson = item.contactPersonName
          //contactPersonName
        })
        that.setState({
          companyList: [...this.state.companyList, ...res.data.rows],
          total: res.data.rowCount,
          noData: res.data.rowCount === 0 ? true : false
        })
      }
    })
  }
  //获取合作方数据
  getPartnersList = () => {
    const that = this
    let params = { "rowNumber": that.state.pageIndex, "pageSize": 10, "conditions": [{ "name": "name", "operator": "%", "value": this.state.keyword }] }
    api.GetPartnersList(params).then(res => {
      if (res.status === 0) {
        res.data.rows.map(item => {
          item.followUpPerson = item.contactPerson
        })
        that.setState({
          companyList: [...this.state.companyList, ...res.data.rows],
          total: res.data.rowCount,
          noData: res.data.rowCount === 0 ? true : false
        })
      }
    })
  }
  //获取售电公司客户列表数据
  getSellingElectricityList = (fn) => {
    const that = this
    let params = { "rowNumber": this.state.pageIndex, "pageSize": 10, "conditions": [{ "operator": "%", "name": "name,shortName,companyStaff.name,companyStaff.mobilePhone", "value": this.state.keyword }] }
    api.GetSellingElectricityList(params).then(res => {
      if (res.status === 0) {
        res.data.rows.map(item => {
          item.followUpPerson = item.legalPersonName
        })
        that.setState({
          companyList: [...this.state.companyList, ...res.data.rows],
          total: res.data.rowCount,
          noData: res.data.rowCount === 0 ? true : false
        })
        fn && fn()
      }
    })
  }
  //加载下一页
  loadMoreData = () => {
    return new Promise((resolve, reject) => {
      let pageIndex = this.state.pageIndex + 1
      if (pageIndex * this.state.pageSize <= this.state.total) {
        this.setState({
          pageIndex: pageIndex
        }, () => {
          if (this.state.type === '1') {
            this.getPowerUserList(resolve)
          } else if (this.state.type === '2') {
            this.getElectricityGenerationList(resolve)
          } else if (this.state.type === '3') {
            this.getPartnersList(resolve)
          } else if (this.state.type === '4') {
            this.getSellingElectricityList(resolve)
          }
        })
      } else {
        resolve()
      }
    })
  }
  
  getSearchTxt = (e) => {
    e.preventDefault();
    // 搜索事件
    this.setState({
      pageIndex:0,
      companyList:[]
    },() => {
      if (this.state.type === '1') {
        this.getPowerUserList()
      } else if (this.state.type === '2') {
        this.getElectricityGenerationList()
      } else if (this.state.type === '3') {
        this.getPartnersList()
      } else if (this.state.type === '4') {
        this.getSellingElectricityList()
      }
    })
  }

  handelChange = (e) => {
    this.setState({
      keyword:e.target.value
    })
  }

  //售电
  sellingElectricity = () => {
    return (
      <div>
        <div className="title">
          <div><i className="iconfont iconshoudiangongsi"></i></div>
          <div>
            <p style={{ fontSize: '23px', color: '#288dfd' }}>{this.state.total}</p>
            <p style={{ fontSize: '11px', color: '#999999', paddingTop: '4px' }}>售电公司总数</p>
          </div>
        </div>
        <div style={{ height: '10px' }}></div>
        <div className="electricityCompany-search">
          <div className="search-input">
            <form onSubmit={(e) => this.getSearchTxt(e)}>
              <input type="search" onChange={this.handelChange} placeholder="搜公告标题、内容、介绍" />
            </form>
          </div>
        </div>
        {this.state.companyList && this.state.companyList.map((item, index) => {
            return <div key={index}>
              <div className="electricityCompany-item">
                <Link to={`/electricitySaleCompany?id=${item.id}`}>
                  <div className="info">
                    <p style={{ fontSize: '15px', color: '#2b2a30', lineHeight: '18px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: '#94c0f4', paddingTop: '12px' }}><span style={{ marginRight: '20px' }}>{item.followUpPerson || '-'}</span>{item.contactPersonMobile}</p>
                  </div>
                  <div className="address">
                    {item.adminRegion}
                  </div>
                </Link>
              </div>
              <div style={{ height: '10px', background: '#f0f1f3' }}></div>
            </div>
          })}
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
            <p style={{ fontSize: '23px', color: '#288dfd' }}>{this.state.total}</p>
            <p style={{ fontSize: '11px', color: '#999999', paddingTop: '4px' }}>发电企业总数</p>
          </div>
        </div>
        <div style={{ height: '10px' }}></div>
        {this.state.companyList && this.state.companyList.map((item, index) => {
            return <div key={index}>
              <div className="electricityCompany-item">
                <Link to={`/powerGenerationEnterprise?id=${item.id}&participantId=${item.pid}`}>
                  <div className="info">
                    <p style={{ fontSize: '15px', color: '#2b2a30', lineHeight: '18px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: '#94c0f4', paddingTop: '12px' }}><span style={{ marginRight: '20px' }}>{item.followUpPerson || '-'}</span>{item.contactPersonMobile}</p>
                  </div>
                  <div className="address">
                    {item.adminRegion}
                  </div>
                </Link>
              </div>
              <div style={{ height: '10px', background: '#f0f1f3' }}></div>
            </div>
          })}
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
            <p style={{ fontSize: '23px', color: '#288dfd' }}>{this.state.total}</p>
            <p style={{ fontSize: '11px', color: '#999999', paddingTop: '4px' }}>合作方总数</p>
          </div>
        </div>
        <div style={{ height: '10px' }}></div>
        <div className="electricityCompany-search">
          <div className="search-input">
            <input type="search" placeholder="搜客户名称" />
          </div>
        </div>
        {this.state.companyList && this.state.companyList.map((item, index) => {
            return <div key={index}>
              <div className="electricityCompany-item">
                <Link to={`/detailsPartners?id=${item.id}&participantId=${item.participantId}`}>
                  <div className="info">
                    <p style={{ fontSize: '15px', color: '#2b2a30', lineHeight: '18px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: '#94c0f4', paddingTop: '12px' }}><span style={{ marginRight: '20px' }}>{item.followUpPerson || '-'}</span>{item.contactPersonMobile}</p>
                  </div>
                  <div className="address">
                    {item.adminRegion}
                  </div>
                </Link>
              </div>
              <div style={{ height: '10px', background: '#f0f1f3' }}></div>
            </div>
          })}
      </div>
    )
  }
  //电力用户
  powerUsers = () => {
    return (
      <div>
        <div className="title">
          <div style={{ lineHeight: '39px' }}><img src={require('../assets/img/img019.png')} style={{ display: 'inline-block', verticalAlign: 'middle' }} alt="" /></div>
          <div>
            <p style={{ fontSize: '23px', color: '#288dfd' }}>{this.state.total}</p>
            <p style={{ fontSize: '11px', color: '#999999', paddingTop: '4px' }}>用电企业总数</p>
          </div>
        </div>
        <div style={{ height: '10px' }}></div>
        {this.state.companyList && this.state.companyList.map((item, index) => {
            return <div key={index}>
              <div className="electricityCompany-item">
                <Link to={`/powerUserDetails?id=${item.id}&participantId=${item.participantId}`}>
                  <div className="info">
                    <p style={{ fontSize: '15px', color: '#2b2a30', lineHeight: '18px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: '#94c0f4', paddingTop: '12px' }}><span style={{ marginRight: '20px' }}>{item.followUpPerson || '-'}</span>{item.contactPersonMobile}</p>
                  </div>
                  <div className="address">
                    {item.adminRegion}
                  </div>
                </Link>
              </div>
              <div style={{ height: '10px', background: '#f0f1f3' }}></div>
            </div>
          })}
      </div>
    )
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f1f3' }} className="electricityCompany">
        <Header title={this.state.title} back={true} search={false} />
        <Scroll
          ref='scroll'
          pullUpLoad
          pullUpLoadMoreData={this.loadMoreData}
          isPullUpTipHide={false}
          bounce={false}
          click={true}>
          <div style={{ height: '45px' }}></div>
          {this.state.type === '1' && this.powerUsers()}
          {this.state.type === '2' && this.electricityGeneration()}
          {this.state.type === '3' && this.partners()}
          {this.state.type === '4' && this.sellingElectricity()}
          
        </Scroll>
        {this.state.noData && <NoData />}
      </div>
    )
  }
}

