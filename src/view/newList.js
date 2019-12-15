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
export default class NewList extends React.Component {
  constructor(props) {
    super(props)
    let title = "消息"
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
        { id: 1, title: '已读消息' },
        { id: 2, title: '未读消息' }
      ],
      active: 1
    }
  }

  componentDidMount() {
    const that = this
    that.getNoticeList()
  }

  getNoticeList = () => {
    const that = this
    let params = { "rowNumber": that.state.pageIndex, "pageSize": 5, "conditions": [{ "name": "group.name", "value": "CompanyAnnouncement", "operator": "=" }], "orders": [{ "order": "down", "name": "lastUpdateTime" }] }
    api.GetCompanyNoticeList(params).then(res => {
      if (res.status === 0) {
        that.setState({
          companyNewList: res.data.rows,
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
  }
  loadMoreData = () => {

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

  render() {
    return (
      <div style={{ background: '#fff' }}>
        <Header title={this.state.title} back={true} search={false} />
        <Scroll
          ref='scroll'
          pullUpLoad
          pullUpLoadMoreData={this.loadMoreData}
          isPullUpTipHide={false}
          bounce={false}
          click={true}>
          <div style={{ height: '45px' }}></div>
          {this.state.type === '2' && <div className="chagen_tab">
            <div className="change_tab_list">
              <ul>
                {this.state.tabs && this.state.tabs.map((item, index) => {
                  return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id })}>{item.title}(5)</li>
                })}
              </ul>
            </div>
          </div>}

          <div className="company-search-view" style={{ position: 'initial' }}>
            <div className="company-search">
              <form onSubmit={(e) => this.getSearchTxt(e)}>
                <input type="search" placeholder="搜公告标题、内容、介绍" onChange={(e) => this.getSearchData(e.target.value)} />
              </form>
            </div>
          </div>
          <div className="company-new-list">
            {this.state.companyNewList.map(item => {
              return <div key={item.id} className="item">
                <Link to={`/newDetaile/${this.state.type}/${item.id}`}>
                  <div className="info">
                    <div className="title">{item.title}</div>
                    <div className="time">发布时间：{item.lastUpdateTime}</div>
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
      </div>
    )
  }
}
