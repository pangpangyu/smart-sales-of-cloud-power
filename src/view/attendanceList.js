import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import NoData from '../components/noData';

/*
考勤管理
*/
class AttendanceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput:'',
            attendanceList:[
                {
                    type:1,
                    name:'请假',
                    kind:'事假',
                    time:'2019-01-01~2019-01-02',
                    reason:'心情不好',
                    state:'未提交'
                },
                {
                    type:1,
                    name:'请假',
                    kind:'事假',
                    time:'2019-01-01~2019-01-02',
                    reason:'不好心情不好心情不好心情不好心情不好',
                    state:'未提交'
                },
            ],
        }
    }

    render() {
        return (
            <Fragment>
				<Header title={'考勤管理'} back={true}>
                    <div className="head-add"><i className="iconfont iconadd"></i></div>
                </Header>
                <Search title={'搜考勤类型、请假类型、事由、状态'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit}></Search>

                <ul className="attendance-list">
                    {
                        this.state.attendanceList.map((item,index)=>{
                            return(
                                <Fragment key={index}>
                                <li className="item" >
                                    <Link to="">
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

                <div className="mask" style={{display:"none"}}>
                    <div className="attedance-dialog">
                        <div className="tit">考勤管理</div>
                        <div className="cont">
                            <div className="item">
                                <img className="img" src={require('../assets/img/img105.png')} alt=""/>
                                <div>
                                    <input className="self-radio" id="r1" type="radio" name="attedance" />
                                    <label htmlFor="r1">
                                        <img className="img" src={require('../assets/img/img108.png')} alt=""/>
                                    </label>
                                </div>
                            </div>
                            <div className="item">
                                <img className="img" src={require('../assets/img/img106.png')} alt=""/>
                                <div><input type="radio" name="attedance" /></div>
                            </div>
                            <div className="item">
                                <img className="img" src={require('../assets/img/img107.png')} alt=""/>
                                <div><input type="radio" name="attedance" /></div>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn-cancel">取消</button>
                            <button className="btn-sure">确定</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    handleSearchInput=e=>{
        // console.log(e.target.value);
        this.setState({
            searchInput:e.target.value
        })
    }
    handleSearchSubmit=e=>{
        //console.log(this.state.searchInput);
        this.setState({
            attendanceList:[]
        })
    }
}

export default AttendanceList;