import React from 'react';
import Header from '../components/header';
import { Tabs, View } from 'antd-mobile';
import { Link } from 'react-router-dom';
import api from '../api/index';
import NoData from '../components/noData';
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
        { id: 0, title: '已读' },
        { id: 1, title: '未读' }
    ]
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

  render() {
    return (
      <div style={{ background: '#fff' }}>
        <Header title={this.state.title} back={true} search={false} />
        {this.state.type === '2' && <Tabs
          tabs={this.state.tabs}
          swipeable={false}
          tabBarActiveTextColor="#288dfd"
          onChange={this.handleTabs}
        >
        </Tabs>}
        
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
      </div>
    )
  }
}
