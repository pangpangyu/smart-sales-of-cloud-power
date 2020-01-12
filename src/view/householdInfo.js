import React, { Fragment } from 'react';
import api from '../api/index';
import NoData from '../components/noData';

/*
客户管理-详情
*/

class PowerDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id:this.props.id,
			list:[],
			isNotData:false
		}
	}
	componentWillMount(){
		this.getData()
	}
	getData = () => {
		const that = this
		let params = `?participantId=549`//${this.state.id}
		api.GetPowerUsersMemberInfo(params).then(res => {
			if(res.status === 0){
				that.setState({
					list:res.data.rows,
					isNotData:res.data.rows.length === 0 ? true : false
				})
			}
		})
	}
	//户号信息
	householdInformation = () => {
		return (
			<div className="contract-mes">
				<div className="module-list">
					<ul>
						{ this.state.list.map(item => {
							return <li className="item">
											<span className="l">{item.marketChargeNumber}</span>
											<span className="r"><label>{item.powerUnit}</label><label>{item.electricUnit}</label></span>
										</li>
						}) }
					</ul>
				</div>
			</div>
		)
	}
	//机组成本
	unitCost = () => {
		return (
			<div className="module-list">
				<ul>
					<li className="item">
						<span className="l">机组1</span>
						<span className="r"><label>机组启动类型</label><label>启动时间</label></span>
					</li>
					<li className="item">
						<span className="l">机组2</span>
						<span className="r"><label>机组启动类型</label><label>启动时间</label></span>
					</li>
				</ul>
			</div>
		)
	}

	render() {
		return (
			<Fragment>
				<div>
					{ this.state.isNotData && <NoData/> }
					{this.props.type === '1' && this.householdInformation()}
					{this.props.type === '2' && this.unitCost()}
				</div>
			</Fragment>
		)
	}
}

export default PowerDetails;