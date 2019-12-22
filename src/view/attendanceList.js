import React, { Fragment } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { Tabs } from 'antd-mobile';
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
			isSearch:false,
			dataList: [],
			dataListwc: [],
			dataListjb: [],
			addStatus: false,
			applyType: '',

			pageIndex: 0,
			pageSize: 10,
			total: 0,

			isNoData: false,
			tabs: [
				{ id: 0, title: '请假' },
				{ id: 1, title: '外出' },
				{ id: 2, title: '加班' },
			],
			showLeaveType: 0,//考勤类型 对应tab id
		}
	}

	componentWillMount() {
		const that = this;
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		that.queryDataList(0)//考勤列表
	}

	//
	handleTabs = (val) => {
		const that = this;
		//console.log(val)
		that.setState(preState => {
			return ({
				showLeaveType: val.id,
				pageIndex:0,
			})

		})
		if (val.title === "请假") {
			that.queryDataList(0)//考勤列表
		}
		if (val.title === "外出") {
			that.GetvEgressTableData(0)//外出列表
		}
		if (val.title === "加班") {
			that.GetvOvertimeTableData(0)//加班列表
		}
	}

	// 获取考勤列表
	queryDataList = (page, loadmoreResolve) => {
		const that = this
		let params = {
			"rowNumber": page*that.state.pageSize,
			"conditions": [{ "name": "name", "operator": "%", "value": this.state.searchInput }],
			"pageSize": that.state.pageSize
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

	// 获取加班管理列表
	GetvOvertimeTableData = (page, loadmoreResolve) => {
		const that = this;
		//查询时
		let params;
		if(that.state.isSearch&&that.state.searchInput!=''){//查询时候
			params = {
				"rowNumber":  page*that.state.pageSize,
				"pageSize": that.state.pageSize,
				"conditions": [{
					"name": "name",
					"operator": "%",
					"value": this.state.searchInput
				}],
				"random": 0,
				"time":new Date().getTime()
			}
		}else{
			params = {
				"rowNumber":  page*that.state.pageSize,
				"pageSize": that.state.pageSize,
				"random": 0,
				"time":new Date().getTime()
			}
		}
		
		api.GetvOvertimeTableData(params).then(res => {
			console.log('加班管理列表:', res)
			if (res.status === 0) {
				that.setState(preState => {
					return ({
						dataListjb: [...preState.dataListjb, ...res.data.rows || []],
						total: res.data.rowCount,
						isNoData: res.data.rowCount === 0 ? true : false,
						pageIndex: page + 1
					})
				})
				loadmoreResolve && loadmoreResolve();
			}

		})

	}

	// 获取外出管理列表
	GetvEgressTableData = (page, loadmoreResolve) => {
		const that = this
		let params = {
			"rowNumber": page*that.state.pageSize,
			"conditions": [{ "name": "name", "operator": "%", "value": this.state.searchInput }],
			"pageSize":that.state.pageSize
		}
		api.GetvEgressTableData(params).then(res => {
			console.log('获取外出管理列表:', res)
			if (res.status === 0) {
				if(res.data){
					that.setState(preState => {
						return ({
							dataListwc: [...preState.dataListwc, ...res.data.rows || []],
							total: res.data.rowCount,
							isNoData: res.data.rowCount === 0 ? true : false,
							pageIndex: page + 1
						})
					})
					loadmoreResolve && loadmoreResolve();
				}	
			}

		})
	}


	// 搜索
	handleSearchInput = e => {
		this.setState({
			searchInput: e.target.value
		})
	}
	handleSearchSubmit = e => {
		const that=this;
		setTimeout(function(){
			that.setState({
				dataList: [],
				dataListwc: [],
				dataListjb: [],
				pageIndex: 0,
				pageSize: 10,
				total: 0,
				isSearch:true
			})
			if(that.state.showLeaveType==0){//请假
				that.queryDataList(0);
			}
			if(that.state.showLeaveType==1){//外出
				that.GetvEgressTableData(0);
			}
			if(that.state.showLeaveType==2){//加班
				that.GetvOvertimeTableData(0);
			}

		},0)
		
		
		
	}



	//加载下一页
	loadMoreData = () => {
		return new Promise((resolve, reject) => {
			if (this.state.dataList.length < this.state.total) {
				if(this.state.showLeaveType==0){
					this.queryDataList(this.state.pageIndex, resolve);
				}
				if(this.state.showLeaveType==1){
					this.GetvEgressTableData(this.state.pageIndex, resolve);
				}
				if(this.state.showLeaveType==2){
					this.GetvOvertimeTableData(this.state.pageIndex, resolve);
				}
				
			} else {
				resolve()
			}
		})

	}


	handleCheckChanged = e => {
		//console.log(e.target.value)
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
	handleOk = e => {
		if (this.state.applyType === '') {
			Toast.info("请选择");
		} else {
			window.location.href = "/attendanceAdd?applyType=" + this.state.applyType + "&addStatus=1" // addStatus=1 设为新增标识
		}
	}

	//请假审批状态
	GetAuditTypeOptions = () => {
		const that = this
		let params = {}
		api.GetAuditTypeOptions(params).then(res => {
			console.log('请假审批状态:', res)
			if (res.status === 0) {
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
		let qingjia =
			<ul className="attendance-list">
				{
					this.state.dataList.map((item, index) => {
						return (
							<Fragment key={index}>
								<li className="item" >
									<Link to={`/attendanceAdd?type=${item.leaveType}&id=${item.id}&status=${item.status}&leaveCode=${item.leaveCode}&editType=qjedit`}>
										<div className="tit">{item.systemUserName}</div>
										<div className="mes">
											<span className="s1">请假类型：</span>
											<span className="s2">{item.leaveType}</span>
										</div>
										<div className="mes">
											<span className="s1">请假时间：</span>
											<span className="s2">{item.startTime}</span>
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
		let waichu =
			<ul className="attendance-list">
				{
					this.state.dataListwc.map((item, index) => {
						return (
							<Fragment key={index}>
								<li className="item" >
									<Link to={`/attendanceAdd?type=${item.egressType}&id=${item.id}&status=${item.status}&leaveCode=${item.egressCode}&editType=wcedit`}>
										<div className="tit">{item.systemUserName}</div>
										<div className="mes">
											<span className="s1">外出类型：</span>
											<span className="s2">{item.egressType}</span>
										</div>
										<div className="mes">
											<span className="s1">外出时间：</span>
											<span className="s2">{item.startTime}</span>
										</div>
										<div className="mes">
											<span className="s1">外出事由：</span>
											<span className="s2">{item.egressReason}</span>
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

		let jiaban =
			<ul className="attendance-list">
				{
					this.state.dataListjb.map((item, index) => {
						return (
							<Fragment key={index}>
								<li className="item" >
									<Link to={`/attendanceAdd?type=${item.overtimeType}&id=${item.id}&status=${item.status}&leaveCode=${item.overtimeCode}&editType=jbedit`}>
										<div className="tit">{item.systemUserName}</div>
										<div className="mes">
											<span className="s1">加班类型：</span>
											<span className="s2">{item.overtimeType}</span>
										</div>
										<div className="mes">
											<span className="s1">加班时间：</span>
											<span className="s2">{item.startTime}</span>
										</div>
										<div className="mes">
											<span className="s1">加班事由：</span>
											<span className="s2">{item.overtimeReason}</span>
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
		return (
			<Fragment>
				<Header title={'考勤管理'} back={true}>
					<div onClick={this.handleAdd} className="head-add"><i className="iconfont iconadd"></i></div>
				</Header>
				<Search title={'搜考勤类型、请假类型、事由、状态'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit}></Search>
				<div className="scroll-wrap">
					<Tabs
						tabs={this.state.tabs}
						swipeable={false}
						tabBarActiveTextColor="#288dfd"
						onChange={this.handleTabs}
					>
					</Tabs>
					{this.state.isNoData ? <NoData /> :
						<Scroll
							ref='scroll'
							pullUpLoad
							pullUpLoadMoreData={this.loadMoreData}
							isPullUpTipHide={false}
							bounce={false}
							click={true}>


							{this.state.showLeaveType === 0 ? qingjia : ''}
							{this.state.showLeaveType === 1 ? waichu : ''}
							{this.state.showLeaveType === 2 ? jiaban : ''}
						</Scroll>}
				</div>

				{this.state.addStatus ? mask : ''}
			</Fragment>
		)
	}

}

export default AttendanceList;