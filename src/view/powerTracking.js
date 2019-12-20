import React from 'react'
import Header from '../components/header'
import Search from '../components/search';
import { Link } from 'react-router-dom'
import api from '../api';
import Scroll from 'react-bscroll';
import 'react-bscroll/lib/react-scroll.css';
import NoData from '../components/noData';

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [
				// { id: 1, title: '山西地方电力xxx1有限公司', n1: '一级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
				// { id: 2, title: '山西地方电力xxx1有限公司', n1: '二级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
				// { id: 3, title: '山西地方电力xxx1有限公司', n1: '三级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
				// { id: 4, title: '山西地方电力xxx1有限公司', n1: '良好', n2: '8000', n3: '5000', n4: '500', n5: '5' }
			],
			pageIndex: 0,
			noData:false
		}
	}

	componentDidMount() {
		this.getDataList()
	}

	getDataList = () => {
		let params = {
			"rowNumber": this.state.pageIndex,
			"pageSize": 10,
			"yearMon1": 1,
			"yearMon": '2019-11'
		}
		api.GetRealtimePowerTableData(params).then(res => {
			if (res.status === 0) {
				this.setState({
					list: res.data.rows,
					totle: res.data.rowCount,
					noData: res.data.rowCount === 0 ? true : false
				})
			}
		})
	}

	handleSearchInput = e => {
		this.setState({
			searchInput: e.target.value
		})
	}
	handleSearchSubmit = e => {
		this.setState({
			contractManageList: [],
			pageIndex: 0
		}, () => {
			this.getDataList();
		})
	}
	loadMoreData = () => {
		return new Promise((resolve, reject) => {
			let pageIndex = this.state.pageIndex + 1
			if (pageIndex * this.state.pageSize <= this.state.total) {

			} else {
				resolve()
			}
		})
	}
	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='电量跟踪' back={true} search={false}></Header>
				<Scroll
					ref='scroll'
					pullUpLoad
					pullUpLoadMoreData={this.loadMoreData}
					isPullUpTipHide={this.state.pageIndex === 0}
					bounce={false}
					click={true}>
					<div style={{ height: '45px' }}></div>
					<div className="power_tracking">
						<div className="top">
							<div className="current_date">
								<p>当前日期：2019年12月</p>
							</div>
							<Search title={'搜客户名称'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
						</div>
						<div className="tab">
							{this.state.list && this.state.list.map(item => {
								return <div className="item" key={item.id}>
									<Link to={`/powerTrackingDet`}>{this.state.txt}
										<h3>{item.power_user_name}</h3>
										<div className="list">
											<ul>
												<li><p>预警等级：<label className={(item.forecast_grade === '一级预警' ? 'lb1' : '') + ' ' + (item.forecast_grade === '二级预警' ? 'lb2' : '') + ' ' + (item.forecast_grade === '三级预警' ? 'lb3' : '') + ' ' + (item.forecast_grade === '良好' ? 'lb1' : '')}>{item.forecast_grade}</label></p></li>
												<li><p>交易电量：<span>{item.month_trade_power}</span>兆瓦时</p></li>
												<li><p>实际电量：<span>{item.month_actuall_power_total}</span>兆瓦时</p></li>
												<li><p>预测偏差：<span>{item.month_forecast_deviation_power}</span>兆瓦时</p></li>
												<li><p>偏差率：<span>{item.month_forecast_deviation_rate}%</span></p></li>
											</ul>
										</div>
									</Link>
								</div>
							})}
							{this.state.noData && <NoData/> }
						</div>
					</div>
				</Scroll>
			</div>
		)
	}
}