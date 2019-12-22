import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import api from '../api';
import noData from '../components/noData';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageIndex: 0,
			pageSize:10,
			total: 0,
			dataList: [],
			noData: false
		}
	}
	componentDidMount() {
		this.getDataList()
	}

	getDataList = () => {
		const that = this
		let params = `?rowNumber=${that.state.pageIndex*that.state.pageSize}&pageSize=${that.state.pageSize}`
		api.GetScheduleList(params).then(res => {
			if (res.status === 0) {
				that.setState({
					dataList: [...this.state.dataList,...res.data.rows],
					total: res.data.rowCount,
					noData: res.data.rowCount === 0 ? true : false
				})
			}
		})
	}

	loadMoreData = () => {
		const that = this
		let pageIndex = that.state.pageIndex + 1
		return new Promise((resolve, reject) => {
			if (pageIndex * that.state.pageSize < that.state.total) {
				let params = `?rowNumber=${pageIndex*that.state.pageSize}&pageSize=${that.state.pageSize}`
				api.GetScheduleList(params).then(res => {
					if (res.status === 0) {
						that.setState({
							pageIndex:pageIndex,
							dataList: [...this.state.dataList,...res.data.rows],
							total: res.data.rowCount,
							noData: res.data.rowCount === 0 ? true : false
						})
						resolve()
					} else {
						reject()
					}
				})
			} else {
				resolve()
				this.setState({
					isPullUpLoad: false,
				})
			}
		})
	}

	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title={'待办事项'} back={true} search={false}></Header>
				<Scroll
					ref='scroll'
					pullUpLoad
					pullUpLoadMoreData={this.loadMoreData}
					isPullUpTipHide={this.state.pageIndex === 0}
					bounce={false}
					click={true}>
					<div style={{ height: '45px' }}></div>
					<div className="todolist">
						<ul>
							{this.state.dataList && this.state.dataList.length > 0 &&
								this.state.dataList.map((item, index) => {
									return <li key={index}>
										<Link to={`/todoDetLc/${item.id}`}>
											<p><span>业务名称：</span>{item.name} <label>[{item.businessSequence}]</label></p>
											<p><span>发起人：</span>{item.startUser}</p>
											<p><span>发起时间：</span>{item.taskCreateTime}</p>
											<p>流程环节</p>
											<p><span>已停留时间：</span>{item.passTime}</p>
										</Link>
									</li>
								})
							}
						</ul>
						{this.state.noData && <noData />}
					</div>
				</Scroll>
			</div>
		)
	}
}