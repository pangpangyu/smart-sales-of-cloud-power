import React from 'react'
import Header from '../components/header'
import { getDataQuery } from '../utils/index'
import api from '../api'
import { baseUrl } from '../config/index'

export default class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type:getDataQuery('active'),
			noticeDetail:{},
			resultDetail:{}
		}
	}
	componentWillMount() {
		if(this.state.type === '1'){
			this.getNoticeById()
		}else{
			this.getResultById()
		}
	}
	getNoticeById = () => {
		let params = `?noticeId=${getDataQuery('id')}`//
		api.getNoticeById(params).then(res => {
			this.setState({
				noticeDetail:res.data
			})
		})
	}
	getResultById = () => {
		let params = `?resultId=${getDataQuery('id')}`//
		api.getResultById(params).then(res => {
			this.setState({
				resultDetail:res.data
			})
		})
	}

	downFile = () => {
		if(this.state.noticeDetail.attachement && this.state.noticeDetail.attachement.url){
			window.open(baseUrl + this.state.noticeDetail.attachement.url)
		}
	}

	downFile2 = () => {
		if(this.state.resultDetail.attachement && this.state.resultDetail.attachement.url){
			window.open(baseUrl + this.state.resultDetail.attachement.url)
		}
	}

	//中长期交易公告信息
	mediumAndLongTermTradeBulletinDet = () => {
		return (
			<div>
				<Header title='交易公告信息' back={true} search={false}></Header>
				<div className="tardingCenterDet">
					<div className="contract-mes">
						<div className="module-list">
							<ul>
								{/* <li className="item">
									<span className="l">时间</span>
									<span className="r">{this.state.noticeDetail.startTime}</span>
								</li>
								<li className="item">
									<span className="l">交易名称</span>
									<span className="r">{this.state.noticeDetail.startTime}</span>
								</li> */}
								<li className="item">
									<span className="l">交易品种</span>
									<span className="r">{this.state.noticeDetail.pingZhong || ''}</span>
								</li>
								<li className="item">
									<span className="l">交易主体</span>
									<span className="r">{this.state.noticeDetail.zhuTi || ''}</span>
								</li>
								<li className="item">
									<span className="l">交易开始时间</span>
									<span className="r">{this.state.noticeDetail.startTime || ''}</span>
								</li>
								<li className="item">
									<span className="l">交易结束时间</span>
									<span className="r">{this.state.noticeDetail.stopTime || ''}</span>
								</li>
								<li className="item">
									<span className="l">交易规模</span>
									<span className="r">{this.state.noticeDetail.guiMo || ''}</span>
								</li>
								<li className="item">
									<span className="l">安全约束</span>
									<span className="r">{this.state.noticeDetail.yeuShu || ''}</span>
								</li>
								{ this.state.noticeDetail.attachement && this.state.noticeDetail.attachement.name && <li className="item">
									<span className="l">附件 </span>
									<span className="r" onClick={this.downFile}>{this.state.noticeDetail.attachement.name}</span>
								</li> }
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
	//中长期交易结果信息
	mediumAndLongTermResultDet = () => {
		return (
			<div>
				<Header title='交易公告信息' back={true} search={false}></Header>
				<div className="tardingCenterDet">
					<div className="contract-mes">
						<div className="module-list">
							<ul>
								<li className="item">
									<span className="l">交易时间</span>
									<span className="r">{this.state.resultDetail.jiaoYiShiJian}</span>
								</li>
								<li className="item">
									<span className="l">参与市场主体数量</span>
									<span className="r">{this.state.resultDetail.zhuTiShuLiang}</span>
								</li>
								<li className="item">
									<span className="l">总申报电量</span>
									<span className="r">{this.state.resultDetail.shenBaoLiang}</span>
								</li>
								<li className="item">
									<span className="l">交易方式</span>
									<span className="r">{this.state.resultDetail.shenBaoFangShi}</span>
								</li>
								<li className="item">
									<span className="l">交易批次</span>
									<span className="r">{this.state.resultDetail.jiaoYiPiCi}</span>
								</li>
								<li className="item">
									<span className="l">成交市场主体数量</span>
									<span className="r">{this.state.resultDetail.chengJiaoShiChangZhuTiShu}</span>
								</li>
								<li className="item">
									<span className="l">最终成交电量</span>
									<span className="r">{this.state.resultDetail.zuiZhongChengJiaoDianLiang}</span>
								</li>
								<li className="item">
									<span className="l">成交均价</span>
									<span className="r">{this.state.resultDetail.chengJiaoJunJia}</span>
								</li>
								<li className="item">
									<span className="l">最高成交价</span>
									<span className="r">{this.state.resultDetail.zuiGaoChengJiaoJia}</span>
								</li>
								<li className="item">
									<span className="l">最低成交价</span>
									<span className="r">{this.state.resultDetail.zuiDiChengJiaoJia}</span>
								</li>
								{ this.state.resultDetail.attachement && this.state.resultDetail.attachement.name && <li className="item">
									<span className="l">附件 </span>
									<span className="r" onClick={this.downFile2}>{this.state.resultDetail.attachement.name}</span>
								</li> }
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
	render() {
		return (
			<div>
				{getDataQuery('active') === '1' && this.mediumAndLongTermTradeBulletinDet()}
				{getDataQuery('active') === '2' && this.mediumAndLongTermResultDet()}
			</div>
		)
	}
}
