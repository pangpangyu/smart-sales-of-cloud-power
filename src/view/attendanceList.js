import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
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
			dataList: [
				{
					createDateTime: "2019-12-06 10:18:22",
					creator: "APP测试",
					days: 1,
					department: "总经理办公室",
					endTime: "2019-12-29 00:00:00",
					hours: 0,
					id: 21,
					index: 1,
					leaveCode: "LV-LV-20191206-00002",
					leaveReason: "1111",
					leaveType: "事假",
					position: "总经理",
					startTime: "2019-12-28 00:00:00",
					status: "未提交",
					systemUserName: "APP测试",
					usercode: "111129",
				}
			],
			addStatus: false,
			applyType: '',

			pageIndex: 0,
			pageSize: 10,
			total: 0,

			isNoData: false,
		}
	}

	componentWillMount() {
		const that = this;
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		that.queryDataList(1)//考勤列表
		that.GetAuditTypeOptions();//请假审批状态
	}

	// 获取考勤列表
	queryDataList = (page, loadmoreResolve) => {
		const that = this
		console.log('11', this.state.searchInput)
		let params = {
			"rowNumber": this.state.pageIndex,
			"conditions": [{ "name": "name", "operator": "%", "value": this.state.searchInput }],
			"pageSize": 10
		}
		api.GetLeaveTableData(params).then(res => {
			console.log('考勤列表:', res)
			if (res.status === 0) {
				that.setState(preState => {
					return ({
						dataList: [...preState.dataList, ...res.data.rows || []],
						total: res.data.rowCount,
						isNoData: res.data.rowCount === 0 ? true : false,
						pageIndex: page + 1
					})
				})
				loadmoreResolve && loadmoreResolve();
			}

		})
	}

	// 搜索
	handleSearchInput = e => {
		// console.log(e.target.value);
		this.setState({
			searchInput: e.target.value
		})
	}
	handleSearchSubmit = e => {
		//console.log(this.state.searchInput);
		this.setState({
			dataList: []
		})
		this.queryDataList(1);
	}



	//加载下一页
	loadMoreData = () => {
		return new Promise((resolve, reject) => {
			if (this.state.dataList.length < this.state.total) {
				this.queryDataList(this.state.pageIndex, resolve);
			} else {
				resolve()
			}
		})

	}


	handleCheckChanged = e => {
		console.log(e.target.value)
		this.setState({
			applyType: e.target.value
		})
	}

	handleAdd = e => {
		this.setState({
			addStatus: true
		})

	}
	//申请取消
	handleCancel = e => {
		this.setState({
			addStatus: false
		})

	}

    //申请确定
    handleOk=e=>{
        if(this.state.applyType==''){
            Toast.info("请选择");
        }else{
            window.location.href="/attendanceAdd?applyType="+this.state.applyType
        }
    }
    
    //请假审批状态
    GetAuditTypeOptions=()=>{
        const that = this
        let params = {}
        api.GetAuditTypeOptions(params).then(res => {
            console.log('请假审批状态:', res)
            if (res.status === 0) {
                // that.setState(preState => {
                //     return ({
                //         dataList: [...preState.dataList, ...res.data.rows||[]],
                //         total: res.data.rowCount,
                //         isNoData: res.data.rowCount === 0 ? true : false,
                //         pageIndex: page + 1
                //     })
                // })
            }

	//请假审批状态
	GetAuditTypeOptions = () => {
		const that = this
		let params = {}
		api.GetAuditTypeOptions(params).then(res => {
			console.log('请假审批状态:', res)
			if (res.status === 0) {
				// that.setState(preState => {
				//     return ({
				//         dataList: [...preState.dataList, ...res.data.rows||[]],
				//         total: res.data.rowCount,
				//         isNoData: res.data.rowCount === 0 ? true : false,
				//         pageIndex: page + 1
				//     })
				// })
			}

		})
	}

	// 
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
						<button onClick={this.handleOk} className="btn-sure">确定</button>
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
					{this.state.isNoData ? <NoData /> :
						<Scroll
							ref='scroll'
							pullUpLoad
							pullUpLoadMoreData={this.loadMoreData}
							isPullUpTipHide={false}
							bounce={false}
							click={true}>
							<ul className="attendance-list">
								{
									this.state.dataList.map((item, index) => {
										return (
											<Fragment key={index}>
												<li className="item" >
													<Link to={`/attendanceAdd?type=${item.leaveType}&id=${item.id}&status=${item.status}`}>
														<div className="tit">{item.systemUserName}</div>
														<div className="mes">
															<span className="s1">请假类型：</span>
															<span className="s2">{item.leaveType}</span>
														</div>
														<div className="mes">
															<span className="s1">请假时间：</span>
															<span className="s2">{item.createDateTime}</span>
														</div>
														<div className="mes">
															<span className="s1">请假事由：</span>
															<span className="s2">{item.leaveReason}</span>
														</div>
														<button className="btn-statue">{item.status}</button>
													</Link>
												</li>
												<div className="module-space"></div>
											</Fragment>
										)
									})
								}
							</ul>
						</Scroll>}
				</div>

				{this.state.addStatus ? mask : ''}
			</Fragment>
		)
	}

}

export default AttendanceList;