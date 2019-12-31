import React from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import api from '../api/index';
import NoData from '../components/noData';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';
/**
 * 公司公告列表
 * 消息提醒列表
 */
class NewList extends React.Component {
  constructor(props) {
    super(props)
    let title = "消息"
    console.log(props)
    if (this.props.match.params.type === '1') {
      title = '公司公告'
    } else if (this.props.match.params.type === '2') {
      title = '消息提醒'
    }
    this.state = {
      title: title,
      type: this.props.match.params.type || 0,
      companyNewList: [],
      total: 0,
      noData: false,
      search: '',
      pageIndex: 0,
      tabs: [
        { id: 1, title: '已读消息', num: 0 },
        { id: 2, title: '未读消息', num: 0 }
      ],
      active: 1,
      alreadyRead: [],
      UnreadList: [],
    }
  }

  componentDidMount() {
    const that = this
    if (that.state.type === '1') {
      that.getComapnyNotice()
    } else {
      //消息列表已读消息
      that.getreadyNew()
      that.getUnreadNew()
    }
  }
  //消息列表已读消息
  getreadyNew = () => {
    let params = '?hasHandled=false'
    api.getNewListPage(params).then(res => {
      if (res.status === 0) {
        let arr = this.state.tabs
        arr[0].num = res.data.rows.length
        console.log(arr)
        this.setState({
          alreadyRead:res.data.rows,
          tabs:arr
        })
      }
    })
  }
  //消息列表未读消息
  getUnreadNew = () => {
    let params = '?hasHandled=true'
    api.getNewListPage2(params).then(res => {
      if (res.status === 0) {
        let arr = this.state.tabs
        arr[1].num = res.data.rows.length
        this.setState({
          UnreadList: res.data.rows,
          tabs:arr
        })
      }
    })
  }
  //获取公司公告息列表
  getComapnyNotice = () => {
    let params = {
      "rowNumber": this.state.pageIndex,
      "pageSize": 1000,
      "conditions": [
        {
          "name": "group.name",
          "value": 'CompanyAnnouncement',
          "operator": "="
        }
      ],
      "orders": [
        {
          "order": "down",
          "name": "lastUpdateTime"
        }
      ]
    }
    api.GetCompanyNoticeList(params).then(res => {
      if (res.status === 0) {
        this.setState({
          companyNewList: [...this.state.companyNewList, ...res.data.rows],
          total: res.data.rowCount,
          noData: res.data.rowCount === 0 ? true : false
        })
      }
    })
  }

  getSearchData = (val) => {
    this.setState({
      search: val
    })
  }

  getSearchTxt = (e) => {
    e.preventDefault();
    //搜索事件
    this.setState({
      companyNewList: [],
      pageIndex: 0
    }, () => {
      this.getComapnyNotice()
    })
  }
  loadMoreData = () => {
    return new Promise((resolve, reject) => {
      //let pageIndex = this.state.pageIndex + 1
      resolve()
    })
  }

  handleTabs = (val) => {
    const that = this;
    // if (val.id == 0) {
    //   that.setState({
    //     botBtnShow: true
    //   })
    // } else {
    //   that.setState({
    //     botBtnShow: false
    //   })
    // }
  }

  msgChg = (e) => {
    this.setState({
      active: e
    })
  }

  showType1 = () => {
    return (
      <Scroll
        ref='scroll'
        pullUpLoad
        pullUpLoadMoreData={this.loadMoreData}
        isPullUpTipHide={this.state.pageIndex === 0}
        bounce={false}
        click={true}>
        <div style={{ height: '45px' }}></div>
        {this.state.type === '2' && <div className="chagen_tab">
          <div className="change_tab_list">
            <ul>
              {this.state.tabs && this.state.tabs.map((item, index) => {
                return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.msgChg(item.id)}>{item.title}({item.num})</li>
              })}
            </ul>
          </div>
        </div>}

        {/* <div className="company-search-view" style={{ position: 'initial' }}>
            <div className="company-search">
              <form onSubmit={(e) => this.getSearchTxt(e)}>
                <input type="search" placeholder="搜公告标题、内容、介绍" onChange={(e) => this.getSearchData(e.target.value)} />
              </form>
            </div>
          </div> */}
        <div className="company-new-list">
          {this.state.companyNewList.map(item => {
            return <div key={item.id} className="item" style={{background:'#fff'}}>
              <Link to={`/newDetaile/${this.state.type}/${item.id}`}>
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="time">发布时间：{item.createTime}</div>
                </div>
                <div className="new">
                  {item.isShowNew && <img src={require('../assets/img/img018.png')} style={{ width: '26px', height: 'auto' }} alt="new" />}
                  <i className="iconfont iconyou"></i>
                </div>
              </Link>
              <div style={{ background: '#f0f1f3', height: '11px' }}></div>
            </div>
          })}
          {this.state.noData && <NoData />}
        </div>
      </Scroll>
    )
  }
  showType2 = () => {
    return (
      <div>
        <div className="chagen_tab">
          <div className="change_tab_list">
            <ul>
              {this.state.tabs.map((item, index) => {
                return <li className={item.id === this.state.active ? 'active' : ''} key={index}  onClick={() => this.msgChg(item.id)}>{item.title}({item.num})</li>
              })}
            </ul>
          </div>
        </div>
        { this.state.active === 1 && <div className="company-new-list">
          {this.state.alreadyRead.length > 0 && this.state.alreadyRead.map(item => {
            return <div key={item.id} className={this.state.type === '1' ? 'item on' : 'item'} style={{background:'#fff'}}>
              <div className="box">
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="time">发布时间：{item.createTime}</div>
                </div>
                { this.state.type === '1' && <div className="new">
                  {item.isShowNew && <img src={require('../assets/img/img018.png')} style={{ width: '26px', height: 'auto' }} alt="new" />}
                  <i className="iconfont iconyou"></i>
                </div> }
              </div>
              <div style={{ background: '#f0f1f3', height: '11px' }}></div>
            </div>
          })}
          {this.state.alreadyRead.length === 0 && <NoData />}
        </div> }
        { this.state.active === 2 && <div className="company-new-list">
          {this.state.UnreadList.length > 0 && this.state.UnreadList.map(item => {
            return <div key={item.id} className={this.state.type === '1' ? 'item on' : 'item'} style={{background:'#fff'}}>
              <div className="box">
                <div className="info">
                  <div className="title">{item.title}</div>
                  <div className="time">发布时间：{item.lastUpdateTime}</div>
                </div>
              </div>
              <div style={{ background: '#f0f1f3', height: '11px' }}></div>
            </div>
          })}
          {this.state.UnreadList.length === 0 && <NoData />}
        </div> }
      </div>
    )
  }

  render() {
    return (
      <div style={{ background: '#f0f1f3',minHeight:'100vh' }}>
        <Header title={this.state.title} back={true} search={false} />
        {this.state.type === '1' && this.showType1()}
        {this.state.type === '2' && this.showType2()}
      </div>
    )
  }
}

export default NewList
