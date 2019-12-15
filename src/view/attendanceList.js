import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';
import api from '../api/index';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';

/*
考勤管理
*/
class AttendanceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            attendanceList: [
                {
                    type: 1,
                    name: '请假',
                    kind: '事假',
                    time: '2019-01-01~2019-01-02',
                    reason: '心情不好',
                    state: '未提交'
                },
                {
                    type: 1,
                    name: '请假',
                    kind: '事假',
                    time: '2019-01-01~2019-01-02',
                    reason: '不好心情不好心情不好心情不好心情不好',
                    state: '未提交'
                },
            ],
            addStatus: false,
            pageIndex: 0,
            total: 0,
            noData: false,
            pageSize: 10,
        }
    }

    componentWillMount() {
        const that = this
    }  

  //加载下一页
  loadMoreData = () => {

  }
    render() {
        let mask =
            <div className="mask">
                <div className="attedance-dialog">
                    <div className="tit">考勤管理</div>
                    <div className="cont">
                        <div className="item">
                            <img className="img" src={require('../assets/img/img105.png')} alt="" />
                            <div className="self-radio">
                                <input id="r1" type="radio" value={"qjsq"} name="attedance" onChange={this.handleCheckChanged} />
                                <label htmlFor="r1">请假申请</label>
                            </div>
                        </div>
                        <div className="item">
                            <img className="img" src={require('../assets/img/img106.png')} alt="" />
                            <div className="self-radio">
                                <input id="r2" type="radio" value={"wcsq"} name="attedance" onChange={this.handleCheckChanged} />
                                <label htmlFor="r2">外出申请</label>
                            </div>
                        </div>
                        <div className="item">
                            <img className="img" src={require('../assets/img/img107.png')} alt="" />
                            <div className="self-radio">
                                <input id="r3" type="radio" value={"jbsq"} name="attedance" onChange={this.handleCheckChanged} />
                                <label htmlFor="r3">加班申请</label>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group">
                        <button onClick={this.handleCancel} className="btn-cancel">取消</button>
                        <button className="btn-sure">确定</button>
                    </div>
                </div>
            </div>
        return (
            <Fragment>
                <Header title={'考勤管理'} back={true}>
                    <div onClick={this.handleAdd} className="head-add"><i className="iconfont iconadd"></i></div>
                </Header>
                <Search title={'搜考勤类型、请假类型、事由、状态'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit}></Search>
                <div className="scroll-wrap">
                <Scroll 
                    ref='scroll'
                    pullUpLoad
                    pullUpLoadMoreData={this.loadMoreData}
                    isPullUpTipHide={false}
                    bounce={false}
                    click={true}>
                    <ul className="attendance-list">
                        {
                            this.state.attendanceList.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li className="item" >
                                            <Link to={`/attendanceAdd/${item.type}`}>
                                                <div className="tit">{item.name}</div>
                                                <div className="mes">
                                                    <span className="s1">请假类型：</span>
                                                    <span className="s2">{item.kind}</span>
                                                </div>
                                                <div className="mes">
                                                    <span className="s1">请假时间：</span>
                                                    <span className="s2">{item.time}</span>
                                                </div>
                                                <div className="mes">
                                                    <span className="s1">请假事由：</span>
                                                    <span className="s2">{item.reason}</span>
                                                </div>
                                                <button className="btn-statue">{item.state}</button>
                                            </Link>
                                        </li>
                                        <div className="module-space"></div>
                                    </Fragment>
                                )
                            })
                        }
                    </ul>
                </Scroll>
                </div>

                {this.state.addStatus ? mask : ''}
            </Fragment>
        )
    }

    handleSearchInput = e => {
        // console.log(e.target.value);
        this.setState({
            searchInput: e.target.value
        })
    }
    handleSearchSubmit = e => {
        //console.log(this.state.searchInput);
        this.setState({
            attendanceList: []
        })
    }

    handleCheckChanged = e => {
        console.log(e.target.value)
    }

    handleAdd = e => {
        this.setState({
            addStatus: true
        })
    }

    handleCancel = e => {
        this.setState({
            addStatus: false
        })
    }
}

export default AttendanceList;