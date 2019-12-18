import React from 'react'
import { Link } from 'react-router-dom'
import NoData from '../components/noData';

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mediumAndLongTermTradeBulletin: this.props.mediumAndLongTermTradeBulletin,
			mediumAndLongTermResult: this.props.mediumAndLongTermResult,
			unifiedLoadRegulation: this.props.unifiedLoadRegulation,
			backupInfo: this.props.backupInfo,
			maintenanceInfo: this.props.maintenanceInfo,
			block: this.props.block,
			FMMarket: this.props.FMMarket,
			provincialNetwork: this.props.provincialNetwork,
			outwardDeliveryPlan: this.props.outwardDeliveryPlan
		}
	}
	//中长期交易公告信息
	MediumAndLongTermTradeBulletin = () => {
		return (
			<div className="tradingCenterList">
				{this.state.mediumAndLongTermTradeBulletin.length > 0 && this.state.mediumAndLongTermTradeBulletin.map(item => {
					return <div className="item" key={item.id}>
						<Link to={`/mediumAndLongTermDet?active=` + this.props.active}>
							<h3>{item.title}</h3>
							<div className="list">
								<ul>
									<li><p><span>交易品种：</span>{item.n1}</p></li>
									<li><p><span>交易规模：</span>{item.n2}</p></li>
									<li><p><span>交易开始：</span>{item.n3}</p></li>
									<li><p><span>交易结束：</span>{item.n4}</p></li>
								</ul>
							</div>
						</Link>
					</div>
				})}
				{ this.state.mediumAndLongTermTradeBulletin.length === 0 && <NoData/> }
			</div>
		)
	}
	//中长期交易结果信息
	MediumAndLongTermResult = () => {
		return (
			<div className="tradingCenterList">
				{this.state.mediumAndLongTermResult.length > 0 && this.state.mediumAndLongTermResult.map(item => {
					return <div className="item" key={item.id}>
						<Link to={`/mediumAndLongTermDet?active=` + this.props.active}>
							<h3>{item.title}</h3>
							<div className="list">
								<ul>
									<li><p><span>交易品种：</span>{item.n1}</p></li>
									<li><p><span>成交均价：</span>{item.n2}</p></li>
									<li><p><span>成交主体数：</span>{item.n3}</p></li>
									<li><p><span>成交电量：</span>{item.n4}</p></li>
								</ul>
							</div>
						</Link>
					</div>
				})
				}
				{ this.state.mediumAndLongTermResult.length === 0 && <NoData/> }
			</div >
		)
	}
	//目前交易市场统调负荷信息
	UnifiedLoadRegulation = () => {
		return (
			<div className="tradingCenterList">
				{this.state.unifiedLoadRegulation.length > 0 && this.state.unifiedLoadRegulation.map(item => {
					return <div className="item" key={item.id}>
						<Link to={`/unifiedLoadRegulationDet`}>
							<div className="list">
								<ul>
									<li><p><span>时间：</span>{item.n1}</p></li>
									<li><p><span>最大负荷：</span>{item.n2}</p></li>
									<li><p><span>最低负荷：</span>{item.n3}</p></li>
								</ul>
							</div>
						</Link>
					</div>
				})
				}
				{this.state.unifiedLoadRegulation.length == 0 && <NoData/>}
			</div >
		)
	}
	//目前交易市场备用信息
	BackupInfo = () => {
		return (
			<div className="tradingCenterList">
				{this.state.backupInfo.length > 0 && this.state.backupInfo.map(item => {
					return <div className="item" key={item.id}>
						<div className="list">
							<ul>
								<li><p><span>备用类型：</span>{item.n1}</p></li>
								<li><p><span>预测：</span>{item.n2}</p></li>
								<li><p><span>日期：</span>{item.n3}</p></li>
							</ul>
						</div>
					</div>
				})}
				{this.state.backupInfo.length === 0 && <NoData/>}
			</div >
		)
	}
	//目前交易市场输变电检修信息
	MaintenanceInfo = () => {
		return (
			<div className="tradingCenterList">
				{this.state.maintenanceInfo.length > 0 && this.state.maintenanceInfo.map(item => {
					return <div className="item" key={item.id}>
						<div className="list">
							<ul>
								<li><p><span>元件名称：</span>{item.n1}</p></li>
								<li><p><span>电压等级：</span>{item.n2}</p></li>
								<li><p><span>日期：</span>{item.n3}</p></li>
							</ul>
						</div>
					</div>
				})
				}
				{this.state.maintenanceInfo.length === 0 && <NoData/>}
			</div >
		)
	}
	//目前交易市场阻塞
	Block = () => {
		return (
			<div className="tradingCenterList">
				{this.state.block && this.state.block.map(item => {
					return <div className="item" key={item.id}>
						<h3>{item.title}</h3>
						<div className="list">
							<ul>
								<li><p><span>正向极限：</span>{item.n1}</p></li>
								<li><p><span>负向极限：</span>{item.n2}</p></li>
								<li><p><span>周期：</span>{item.n3}</p></li>
							</ul>
						</div>
					</div>
				})}
				{ this.state.block.length === 0 && <NoData/> }
			</div>
		)
	}
	//实时市场交易调频市场信息
	FMMarket = () => {
		return (
			<div className="tradingCenterList fm_tradingCenterList">
				{this.state.FMMarket.length > 0 && this.state.FMMarket.map(item => {
					return <div className="item" key={item.id}>
						<div className="list">
							<ul>
								<li><p><span>日期：</span>{item.n1}</p></li>
								<li><p><span>调频服务结算均价：</span>{item.n2}</p></li>
								<li><p><span>可参与市场主体：</span>{item.n3}</p></li>
								<li><p><span>调频市场申报价格范围：</span>{item.n4}</p></li>
							</ul>
						</div>
					</div>
				})
				}
				{ this.state.FMMarket.length === 0 && <NoData/> }
			</div >
		)
	}
	//实时市场交易省网直调负荷曲线
	ProvincialNetwork = () => {
		return (
			<div className="tradingCenterList">
				{this.state.provincialNetwork.length > 0 && this.state.provincialNetwork.map(item => {
					return <div className="item" key={item.id}>
						<Link to={`/provincialNetworkDet`}>
							<div className="list">
								<ul>
									<li><p><span>时间：</span>{item.n1}</p></li>
									<li><p><span>最高负荷：</span>{item.n2}</p></li>
									<li><p><span>最低负荷：</span>{item.n3}</p></li>
								</ul>
							</div>
						</Link>
					</div>
				})
				}
				{ this.state.provincialNetwork.length === 0 && <NoData/> }
			</div >
		)
	}
	//实时市场交易外送计划曲线
	OutwardDeliveryPlan = () => {
		return (
			<div className="tradingCenterList">
				{this.state.outwardDeliveryPlan.length > 0 && this.state.outwardDeliveryPlan.map(item => {
					return <div className="item" key={item.id}>
						<Link to={`/outwardDeliveryPlanDet`}>
							<div className="list">
								<ul>
									<li><p><span>时间：</span>{item.n1}</p></li>
									<li><p><span>最大负荷：</span>{item.n2}</p></li>
									<li><p><span>最低负荷：</span>{item.n3}</p></li>
								</ul>
							</div>
						</Link>
					</div>
				})
				}
				{ this.state.outwardDeliveryPlan.length === 0 && <NoData/> }
			</div >
		)
	}
	render() {
		return (
			<div>
				{this.props.active === '1' && this.props.type === '1' && this.MediumAndLongTermTradeBulletin()}
				{this.props.active === '2' && this.props.type === '1' && this.MediumAndLongTermResult()}

				{this.props.active === '1' && this.props.type === '2' && this.UnifiedLoadRegulation()}
				{this.props.active === '2' && this.props.type === '2' && this.BackupInfo()}
				{this.props.active === '3' && this.props.type === '2' && this.MaintenanceInfo()}
				{this.props.active === '4' && this.props.type === '2' && this.Block()}

				{this.props.active === '1' && this.props.type === '3' && this.FMMarket()}
				{this.props.active === '2' && this.props.type === '3' && this.ProvincialNetwork()}
				{this.props.active === '3' && this.props.type === '3' && this.OutwardDeliveryPlan()}
			</div>
		)
	}
}
