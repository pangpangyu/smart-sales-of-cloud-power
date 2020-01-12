import React from 'react'
import Header from '../components/header'
import api from '../api';
import { getDataQuery } from '../utils/index';

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		let id = getDataQuery('id') || 0
		this.state = {
			id:id,
			data:[],
			time:'',
		}
	}
	componentWillMount() {
		this.getData()
	}

	getData = () => {
		let params = `?unifiedId=${this.state.id}`
		api.getUnifiedById(params).then(res => {
			let arr = JSON.parse(res.data.info)
			let data = []
			arr.map((item,index) => {
				data.push({time:this.getFormatTime(index),data:item})
			})
			this.setState({
				time:res.data.date,
				data:data
			})
		})
	}

	//从00:00开始 参数从0开始  每+1则加15分钟
	getFormatTime = (i) => {
		let t = 15 * 60 * 1000 //15分钟
		let time = 1577808000000 // 2020-01-01 00:00:00 时间搓
		let hours = new Date(time + t * i).getHours() < 10 ? '0' + new Date(time + t * i).getHours() : new Date(time + t * i).getHours() //获取小时
		let minutes = new Date(time + t * i).getMinutes() < 10 ? '0' + new Date(time + t * i).getMinutes() : new Date(time + t * i).getMinutes() //获取分
		return hours + ':' + minutes
	}

	render() {
		return (
			<div>
				<Header title='统调负荷信息' back={true} search={false}></Header>
				<div className="tardingCenterDet">
					<div className="contract-mes">
						<div className="module-list">
							<ul>
								<li className="item">
									<span className="l">时间</span>
									<span className="r">{this.state.time}</span>
								</li>
								{ this.state.data && this.state.data.map((item,index) => {
									return <li className="item" key={index}>
										<span className="l">{ item.time }</span>
										<span className="r">{ item.data }</span>
									</li>
								}) }
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
