import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import { getDataQuery } from '../utils/index';
import api from '../api';

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pickerList: [
				{
					label: 'xxx交易单元',
					value: 'xxx交易单元',
				},
				{
					label: 'xxx交易单元2',
					value: 'xxx交易单元2',
				},
			],
			open: false,
			value: null,
			transactionUnit: '',
			transactionUnit: 'xxx交易单元',
			AnnualBilateral: 0, //年度双边
			contractTransfer: 0,//合同转让电量
			name: `${getDataQuery('name')}`,//公司名称
			date: `${getDataQuery('date')}`,//交易月份
			pageIndex: 0,
			pageSize: 10,
			otherData:{}
		}
	}
	componentWillMount() {
		this.powerTracingAnnualBilateral()
		this.contractTransferredElectricity()
		this.getRealtimePowerTableData()
	}

	getRealtimePowerTableData = () => {
		let params = {
			"rowNumber": this.state.pageIndex*this.state.pageSize,
			"pageSize": this.state.pageSize,
			"yearMon1": 1,
			"yearMon": getDataQuery('date'),
			"userName": getDataQuery('name')
		}
		api.GetRealtimePowerTableData(params).then(res => {
			if (res.status === 0) {
				if(res.data.rows.length > 0){
					this.setState({
						otherData:res.data.rows[0]
					})
				}
			}
		})
	}

	onScrollChange = (value) => {
		this.setState({
			value: value
		})
	}
	getDate = () => {
		const that = this
		this.setState({
			transactionUnit: this.state.value[0],
			open: false
		})
	}
	//年度双边电量
	powerTracingAnnualBilateral = () => {
		let params = {
			rowNumber: this.state.pageIndex * this.state.pageSize,
			pageSize: this.state.pageSize,
			beginTime: this.state.date,
			companyName: this.state.name,
			userid: 0
		}
		api.powerTracingAnnualBilateral(params).then(res => {
			if (res.status === 0) {
				let num = res.data.rows.reduce(function (total, currentValue, currentIndex, arr) {
					return total + parseInt(currentValue.adjPower);
				}, 0);
				this.setState({
					AnnualBilateral: num
				})
			}
		})
	}
	//合同装让电量
	contractTransferredElectricity = () => {
		let params = `&rowNumber=${this.state.pageIndex * this.state.pageSize}&pageSize=${this.state.pageSize}&userName=${this.state.name}&statrYearMonth=${this.state.date}&randomValue=0`
		api.contractTransferor(params).then(res => {
			let num = res.data.rows.reduce(function (total, currentValue, currentIndex, arr) {
				return total + parseInt(currentValue.tradePower);
			}, 0);
			this.setState({
				contractTransfer: num
			})
		})
	}
	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='电量跟踪详情' back={true} search={false}></Header>
				<div className="power_tracking_det">
					<div className="top">
						<h3>山西电力技术有限公司</h3>
					</div>
					<div className="cont">
						<div className="contract-mes">
							<div className="module-list">
								<ul>
									<li className="item">
										<span className="l">公司名称</span>
										<span className="r">{getDataQuery('name')}</span>
									</li>
									<li className="item">
										<span className="l">交易月份</span>
										<span className="r">{getDataQuery('date')}</span>
									</li>
									<li className="item">
										<span className="l">交易电量</span>
										<span className="r">{this.state.otherData.month_trade_power || ''}</span>
									</li>
									<li className="item">
										<span className="l">年度双边电量</span>
										<span className="r">{this.state.AnnualBilateral ? this.state.AnnualBilateral : 0}兆瓦时</span>
									</li>
									<li className="item">
										<span className="l">合同转让电量</span>
										<span className="r">{this.state.contractTransfer ? this.state.contractTransfer : 0}兆瓦时</span>
									</li>
									<li className="item">
										<span className="l">现货申报电量</span>
										<span className="r"><Link to={`/SpotDeclarationDetMonth`}>--</Link></span>
									</li>
									<li className="item">
										<span className="l">实际用电量累计</span>
										<span className="r">{this.state.otherData.month_actuall_power_total || ''}</span>
										{/* <Link to={`/actualPowerRecord`}></Link> */}
									</li>
									<li className="item">
										<span className="l">累计天数</span>
										<span className="r">{this.state.otherData.month_day_total || ''}</span>
									</li>
									<li className="item">
										<span className="l">剩余交易电量 </span>
										<span className="r">{this.state.otherData.month_surplus_trade_power || ''}</span>
									</li>
									<li className="item">
										<span className="l">剩余天数</span>
										<span className="r">{this.state.otherData.plus_day || ''}</span>
									</li>
									<li className="item">
										<span className="l">剩余天数预测电量</span>
										<span className="r">{this.state.otherData.surplus_day_forecast_power || ''}</span>
									</li>
									<li className="item">
										<span className="l">预测偏差电量</span>
										<span className="r">{this.state.otherData.month_forecast_deviation_power || ''}</span>
									</li>
									<li className="item">
										<span className="l">预测偏差率</span>
										<span className="r">{this.state.otherData.month_forecast_deviation_rate || ''}</span>
									</li>
									<li className="item">
										<span className="l">预测等级</span>
										<span className="r">{this.state.otherData.forecast_grade || ''}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
