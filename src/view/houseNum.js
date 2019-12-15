import React from 'react'
import Header from '../components/header'
import HouseholdInfo from './householdInfo';
import AccountManagement from './accountManagement';
import AnnualEstimatedPower from './annualEstimatedPower';
import PowerDetails from './powerDetails';//电力用户详情
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		let title = '公司信息'
		let search = false
		let tabs = [
			{ id: '1', title: '基本信息' },
			{ id: '2', title: '户号信息' },
			{ id: '3', title: '账号管理' },
			{ id: '4', title: '年预计电量' }
		]
		if (this.props.match.params.type === '1') {
			//电力用户信息
			title = '电力用户'
		} else if (this.props.match.params.type === '2') {
			//发电厂信息
			title = '发电企业'
			tabs = [
				{ id: '1', title: '基本资料' },
				{ id: '2', title: '机组成本' },
				{ id: '3', title: '交易信息' }
			]
			search = false
		} else if (this.props.match.params.type === '3') {
			//合作方信息
			title = '合作方'
			tabs = [
				{ id: '1', title: '基本信息' },
				{ id: '2', title: '账号管理' }
			]
			search = false
		} else if (this.props.match.params.type === '4') {
			//售电公司信息
			title = '售电公司'
			tabs = []
			search = false
		}
		this.state = {
			tabs: tabs,
			title: title,
			value: null,
			pickerList: [
				{
					label: '2013',
					value: '2013',
				},
				{
					label: '2014',
					value: '2014',
				},
				{
					label: '2015',
					value: '2015',
				},
				{
					label: '2016',
					value: '2016',
				},
				{
					label: '2017',
					value: '2017',
				},
				{
					label: '2018',
					value: '2018',
				},
				{
					label: '2019',
					value: '2019',
				},
			],
			active: '1',
			type: this.props.match.params.type,
			id: this.props.match.params.id,
			powerUsersDetail: {},
			powerTrade: [],
			powerUsers: [],
			search: search

		}
	}
	componentWillMount() {
		const that = this
		if (that.state.type === '1') {
			//that.getPowerUserDet()
			// that.getPowerTradeInfoTableData()
			// that.getCompanyStaffTableData()
			// that.getYearPowerTableData()
		} else if (that.state.type === '3') {
			// that.getCompanyStaffTableData()

		}
	}
	componentDidMount() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
	
	//户号信息
	// getPowerTradeInfoTableData = () => {
	// 	let params = `?participantId=${getDataQuery('participantId')}`
	// 	api.GetPowerUsersMemberInfo(params).then(res => {
	// 		if (res.status === 0) {
	// 			this.setState({
	// 				powerTrade: res.data.rows
	// 			})
	// 		}
	// 	})
	// }
	//电力用户账号管理
	// getCompanyStaffTableData = () => {
	// 	let params = `?participantId=${getDataQuery('participantId')}`
	// 	api.GetPowerUsersMemberManage(params).then(res => {
	// 		if (res.status === 0) {
	// 			this.setState({
	// 				powerUsers: res.data.rows
	// 			})
	// 		}
	// 	})
	// }
	//年度预计电量
	getYearPowerTableData = () => {
		let params = `?participantId=${getDataQuery('participantId')}`
		api.GetPowerYearEstimate(params).then(res => {
			if (res.status === 0) {
				this.setState({

				})
			}
		})
	}


	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title={this.state.title} back={true} search={false}></Header>
				<div className="housenum">
					{(this.state.type === '1' || this.state.type === '2' || this.state.type === '3') &&
						<div>
							<div className="power_user">
								<h3>信息技术有限公司</h3>
								<div className="list">
									<ul>
										<li><span>地址：</span>山西省太原市XXX区</li>
										<li><span>联系人：</span>张三</li>
										<li><span>联系手机：</span>13169779500</li>
									</ul>
									<div className="clear"></div>
								</div>
							</div>
							<div className="module-space"></div>
						</div>
					}
					<div className="cont">
						<div className="chagen_tab">
							<div className="change_tab_list">
								<ul>
									{this.state.tabs && this.state.tabs.map((item, index) => {
										return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id })}>{item.title}</li>
									})}
								</ul>
							</div>
						</div>
						<div className="">
							{this.state.active === '1' && this.state.type === '1' && <PowerDetails type={this.state.type} id={this.state.id} />}
							{this.state.active === '2' && this.state.type === '1' && <HouseholdInfo type={this.state.type} id={this.state.id} />}
							{this.state.active === '3' && this.state.type === '1' && <AccountManagement id={getDataQuery('participantId')} />}
							{this.state.active === '4' && this.state.type === '1' && <AnnualEstimatedPower type={this.state.type} participantId={getDataQuery('participantId')} />}

							{this.state.active === '1' && this.state.type === '2' && <PowerDetails type={this.state.type} id={this.state.id}  />}
							{this.state.active === '2' && this.state.type === '2' && <HouseholdInfo type={this.state.type} />}
							{this.state.active === '3' && this.state.type === '2' && <AnnualEstimatedPower type={this.state.type} />}

							{this.state.active === '1' && this.state.type === '3' && <PowerDetails type={this.state.type} id={this.state.id}  />}
							{this.state.active === '2' && this.state.type === '3' && (this.state.powerUsers.length === 0 ? <NoData /> : <AccountManagement userList={this.state.powerUsers} participantId={getDataQuery('participantId')} />)}


							{this.state.type === '4' && <PowerDetails type={this.state.type} />}
						</div>
					</div>
				</div>
			</div>
		)
	}
}