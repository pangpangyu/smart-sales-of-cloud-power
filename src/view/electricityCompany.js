import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';
import api from '../api/index';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';
import { PickerView, Button } from 'antd-mobile';

/**
 * 售电公司
 */
export default class ElectricityCompany extends React.Component {
  constructor(props) {
    super(props)
    let title = '公司信息'
    let searchShow = false
    if (this.props.match.params.type === '1') {
      //电力用户信息
      title = '电力用户'
      searchShow = true
    } else if (this.props.match.params.type === '2') {
      //发电厂信息
      title = '发电企业'
      searchShow = true
    } else if (this.props.match.params.type === '3') {
      //合作方信息
      title = '合作方'
      searchShow = false
    } else if (this.props.match.params.type === '4') {
      //售电公司信息
      title = '售电公司'
      searchShow = false
    }
    this.state = {
      title: title,
      type: this.props.match.params.type,
      companyList: [],
      pageIndex: 0,
      total: 0,
      noData: false,
      pageSize: 10,
      keyword: '',
      transactionList: [],//交易类型列表
      transactionValue: '',
      transactionOpen: false,//交易类型选择器
      geographicalAreaList: [],//地理区域列表
      geographicalAreaListChildren: [],
      geographicalAreaValue: '',
      geographicalAreaOpen: false,//地理区域选择器
      searchShow: searchShow,
      searchDrop: false
    }
  }


  componentWillMount() {
    const that = this
    that.getPowerUserAdvancedSearchOptions()
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
  //获取交易类型、地理区域
  getPowerUserAdvancedSearchOptions = () => {
    const that = this
    api.GetPowerUserAdvancedSearchOptions().then(res => {
      if (res.status === 0) {
        let transactionList = []
        res.data.tradeType.options.map(item => {
          transactionList.push({ label: item.text, value: item.value })
        })
        let geographicalAreaList = []
        let geographicalAreaListChildren = []
        res.data.areaRegion.options.map(item => {
          if (item.children) {
            item.children.map(citem => {
              geographicalAreaListChildren.push({ label: citem.text, value: citem.id })
            })
          }
          geographicalAreaList.push({ label: item.text, value: item.id, children: geographicalAreaListChildren })
        })
        that.setState({
          transactionList: transactionList,
          geographicalAreaList: geographicalAreaList
        })
        console.log(this.state.geographicalAreaList)
      }
    })
  }
  //获取交易类型
  transactionOnChange = (value) => {
    console.log(value)
    this.setState({
      transactionValue: value
    });
  };
  //获取电力用户数据
  getPowerUserList = (resolve) => {
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
        resolve && resolve()
      }
    })
  }
  //获取发电企业数据
  getElectricityGenerationList = (resolve) => {
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
        resolve && resolve()
      }
    })
  }
  //获取合作方数据
  getPartnersList = (resolve) => {
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
        resolve && resolve()
      }
    })
  }
  //获取售电公司客户列表数据
  getSellingElectricityList = (resolve) => {
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
        resolve && resolve()
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
      pageIndex: 0,
      companyList: []
    }, () => {
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
      keyword: e.target.value
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
              <Link to={`/electricitySaleCompany?id=${item.id}&companyName=${item.name}&user=${item.followUpPerson}&tel=${item.contactPersonMobile}&address=${item.adminRegion}`}>
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
              <Link to={`/powerGenerationEnterprise?id=${item.id}&participantId=${item.pid}&companyName=${item.name}&user=${item.followUpPerson}&tel=${item.contactPersonMobile}&address=${item.adminRegion}`}>
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
  getSearchData = (val) => {
    this.setState({
      keyword: val
    })
  }
  getSearchTxt = (e) => {
    e.preventDefault();
    //搜索事件
    const that = this
    that.setState({
      pageIndex: 0,
      companyList: []
    }, () => {
      if (that.state.type === '1') {
        that.getPowerUserList()
      } else if (that.state.type === '2') {
        that.getElectricityGenerationList()
      } else if (that.state.type === '3') {
        that.getPartnersList()
      } else if (that.state.type === '4') {
        that.getSellingElectricityList()
      }
    })
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
            <form onSubmit={(e) => this.getSearchTxt(e)}>
              <input type="search" placeholder="搜公告标题、内容、介绍" onChange={(e) => this.getSearchData(e.target.value)} />
            </form>
          </div>
        </div>
        {this.state.companyList && this.state.companyList.map((item, index) => {
          return <div key={index}>
            <div className="electricityCompany-item">
              <Link to={`/detailsPartners?id=${item.id}&participantId=${item.participantId}&companyName=${item.name}&user=${item.followUpPerson}&tel=${item.contactPersonMobile}&address=${item.adminRegion}`}>
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
              <Link to={`/powerUserDetails?id=${item.id}&participantId=${item.participantId}&companyName=${item.name}&user=${item.followUpPerson}&tel=${item.contactPersonMobile}&address=${item.adminRegion}`}>
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
        <Header title={this.state.title} back={true} >
          <div className={this.state.searchShow ? 'header-search' : 'header-search none'} onClick={() => this.setState({ searchDrop: !this.state.searchDrop })}><i className="iconfont iconsousuo"></i></div>
          <div className={this.state.searchDrop ? 'h_drop' : 'h_drop none'}>
            <div className="list">
              <div className="l">
                <p>企业名称</p>
              </div>
              <div className="r">
                <input type="text"></input>
              </div>
            </div>
            <div className="list">
              <div className="l">
                <p>交易类型</p>
              </div>
              <div className="r">
                <span onClick={() => this.setState({ transactionOpen: true })}>请选择</span>
              </div>
            </div>
            <div className="list">
              <div className="l">
                <p>地理区域</p>
              </div>
              <div className="r">
                <span>请选择</span>
              </div>
            </div>
            <div className="btns">
              <Button className="btn btn1" type="primary" onClick={() => this.setState({ searchDrop: false })}>取消</Button>
              <Button className="btn" type="primary">确定</Button>
            </div>
          </div>
        </Header>
        <Scroll
          ref='scroll'
          pullUpLoad
          pullUpLoadMoreData={this.loadMoreData}
          isPullUpTipHide={this.state.pageIndex === 0}
          bounce={false}
          click={true}>
          <div style={{ height: '45px' }}></div>
          {this.state.type === '1' && this.powerUsers()}
          {this.state.type === '2' && this.electricityGeneration()}
          {this.state.type === '3' && this.partners()}
          {this.state.type === '4' && this.sellingElectricity()}

        </Scroll>
        {this.state.noData && <NoData />}

        <div className={this.state.transactionOpen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ transactionOpen: false })}></div>
          <div className="pick_box">
            <PickerView
              data={this.state.transactionList}
              onChange={this.transactionOnChange}
              cascade={false}
              value={this.state.transactionValue}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ transactionOpen: false })}>取消</Button>
              <Button className="btn btn1" type="primary">确定</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

