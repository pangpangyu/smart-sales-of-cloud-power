import React from 'react'
import Header from '../components/header'
import MidLongTermTrade from './midLongTermTrade'
import DayAheadMarket from './dayAheadMarket'
import RealTimeMarket from './realTimeMarket'
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import api from '../api'

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			time: new Date(),
			month: '',
			fullYear: '',
			year: '2019-08',
			active: '1',
			type: '1',
			tabs: [
				{ id: '1', type: '1', title: '中长期交易' },
				{ id: '2', type: '2', title: '日前市场交易' },
				{ id: '3', type: '3', title: '实时市场交易' }
			],
		}
	}
	componentWillMount(){
		this.getNoticeList()
	}
	//中长期交易交易-公告信息列表
	getNoticeList = () => {
		let params = `?rowNumber=0&pageSize=10`
		api.getNoticeList(params).then(res => {

		})
	}
	getDate = () => {
		const that = this
		this.setState({
			year: this.state.fullYear + '-' + this.state.month,
			open: false
		})
	}
	onChange = (value) => {
		let fullYear = new Date(value).getFullYear()
		let month = new Date(value).getMonth() + 1
		this.setState({
			month: month,
			fullYear: fullYear,
			time: value
		});
	};
	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='交易中心公告' back={true} search={false}></Header>
				<div className="trading_center">
					<div className="top">
						<div className="selection_date">
							<p>选择日期<span onClick={() => this.setState({ open: true })}>{this.state.year}</span></p>
						</div>
						<div className="chagen_tab">
							<div className="change_tab_list">
								<ul>
									{this.state.tabs && this.state.tabs.map((item, index) => {
										return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id, type: item.type })}>{item.title}</li>
									})}
								</ul>
							</div>
						</div>
						{this.state.active === '1' && <MidLongTermTrade />}
						{this.state.active === '2' && <DayAheadMarket />}
						{this.state.active === '3' && <RealTimeMarket />}
					</div>
				</div>
				<div className={this.state.open ? 'modal on' : 'modal'}>
					<div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
					<div className="pick_box">
						<DatePickerView
							mode="month"
							locale={enUs}
							value={this.state.time}
							onChange={this.onChange}
						/>
						<div className="module-space"></div>
						<div className="btns">
							<Button className="btn" type="primary" onClick={() => this.setState({ open: false })}>取消</Button>
							<Button className="btn btn1" type="primary" onClick={this.getDate}>确定</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
