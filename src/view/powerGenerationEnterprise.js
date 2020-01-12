import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img3 from '../assets/img/img204.png';
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{ id: '1', title: '基本资料' },
				{ id: '2', title: '机组成本' },
				{ id: '3', title: '交易信息' }
			],
			value: null,
			active: '1',
			id: `${getDataQuery('id')}`,
			participantId: `${getDataQuery('participantId')}`,
			isNotData: false,
			detail: {},
			powerPlantTransactionInfo: [],
			notpowerPlantTransactionInfo: false,
			powerPlantCost:[],
			notPowerPlantCost:false
		}
	}
	componentWillMount() {
		const that = this
		that.getPowerPlantDetail()
		that.getPowerPlantCost()
		that.getPowerPlantTransactionInfo()
	}
	componentDidMount() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
	//电力用户详情基本信息
	getPowerPlantDetail = () => {
		const that = this
		let params = `?id=${this.state.id}`
		api.GetPowerPlantDetail(params).then(res => {
			if (res.status === 0) {
				let detail = {}
				//detail.province = res.data.address.value ? res.data.address.options.filter(v => v.value === res.data.address.value)[0].text : ''
				detail.address = res.data['address.id'].value ? res.data['address.id'].options.filter(v => v.value === res.data['address.id'].value)[0].text : '' //通讯地址
				detail.adminBureau = res.data.adminBureau.value || '' //工商管理局
				detail.adminRegion = res.data['adminRegion.id'].value ? res.data['adminRegion.id'].options.filter(v => v.value === res.data['adminRegion.id'].value)[0].text : '' //行政区域
				detail.companyStat = res.data['companyStat'].value ? res.data['companyStat'].options.filter(v => v.value === res.data['companyStat'].value)[0].text : '' //状态
				detail.conglomerate = res.data['conglomerate.id'].value ? res.data['conglomerate.id'].options.filter(v => v.value === res.data['conglomerate.id'].value)[0].text : ''//所属集团
				detail.contactPersonMobile = res.data.contactPersonMobile.value //手机
				detail.contactPersonName = res.data.contactPersonName.value || '' // 联系人
				detail.depositAccountName = res.data.depositAccountName.value || '' //开户名称
				detail.depositAccountNo = res.data.depositAccountNo.value //账号
				detail.depositBank = res.data.depositBank.value || '' //开户银行
				detail.dispatcher = res.data['dispatcher.id'].value ? res.data['dispatcher.id'].options.filter(v => v.value === res.data['dispatcher.id'].value)[0].text : ''//调度关系
				detail.enterpriseLocation = res.data.enterpriseLocation.value || '' //详细地址
				detail.enterpriseNature = res.data['enterpriseNature.id'].value ? res.data['enterpriseNature.id'].options.filter(v => v.value === res.data['enterpriseNature.id'].value)[0].text : '' //企业性质
				detail.equityStr = res.data.equityStr.value //股权结构
				detail.fax = res.data.fax.value || '' //传真
				detail.legalPersonId = res.data.legalPersonId.value || '' //证件号
				detail.legalPersonName = res.data.legalPersonName.value || '' //法人姓名
				detail.name = res.data.name.value || '' //机组名称
				detail.organizationCode = res.data.organizationCode.value//组织机构代码
				detail.postalcode = res.data.postalcode.value || '' //邮政编码
				detail.prefecturePowerGrid = res.data['prefecturePowerGrid.id'].value ? res.data['prefecturePowerGrid.id'].options.filter(v => v.value === res.data['prefecturePowerGrid.id'].value)[0].text : '' //所属地级电网公司
				detail.provincialPowerGrid = res.data['provincialPowerGrid.id'].value ? res.data['provincialPowerGrid.id'].options.filter(v => v.value === res.data['provincialPowerGrid.id'].value)[0].text : '' //所属省级电网公司
				detail.shortName = res.data.shortName.value//电厂简称
				detail.telephone = res.data.telephone.value || '' //电话
				that.setState({
					detail: detail
				})
			}
		})
	}
	//发电公司详情
	electricityGenerationDet = () => {
		return (
			<div>
				<div className="contract-mes">
					<ModuleTit title="基本信息" imgurl={img1} >
					</ModuleTit>
					<div className="module-list">
						<ul>
							<li className="item">
								<span className="l">电厂名称</span>
								<span className="r">{this.state.detail.name}</span>
							</li>
							<li className="item">
								<span className="l">电厂简称</span>
								<span className="r">{this.state.detail.shortName}</span>
							</li>
							<li className="item">
								<span className="l">所属集团</span>
								<span className="r">{this.state.detail.conglomerate}</span>
							</li>
							<li className="item">
								<span className="l">企业性质</span>
								<span className="r">{this.state.detail.enterpriseNature}</span>
							</li>
							<li className="item">
								<span className="l">所属省级电网公司</span>
								<span className="r">{this.state.detail.provincialPowerGrid}</span>
							</li>
							<li className="item">
								<span className="l">所属地级电网公司</span>
								<span className="r">{this.state.detail.prefecturePowerGrid}</span>
							</li>
							<li className="item">
								<span className="l">调度关系</span>
								<span className="r">{this.state.detail.dispatcher}</span>
							</li>
							<li className="item">
								<span className="l">状态</span>
								<span className="r">{this.state.detail.companyStat}</span>
							</li>
							<li className="item">
								<span className="l">行政区域</span>
								<span className="r">{this.state.detail.adminRegion}</span>
							</li>
							<li className="item">
								<span className="l">股权结构</span>
								<span className="r">{this.state.detail.equityStr}</span>
							</li>
						</ul>
						<div className="module-space"></div>
						<ModuleTit title="联系信息" imgurl={img3} />
						<ul>
							<li className="item">
								<span className="l">联系人</span>
								<span className="r">{this.state.detail.contactPersonName}</span>
							</li>
							<li className="item">
								<span className="l">联系电话</span>
								<span className="r">{this.state.detail.telephone}</span>
							</li>
							<li className="item">
								<span className="l">手机</span>
								<span className="r">{this.state.detail.contactPersonMobile}</span>
							</li>
							<li className="item">
								<span className="l">传真</span>
								<span className="r">{this.state.detail.fax}</span>
							</li>
							<li className="item">
								<span className="l">详细地址</span>
								<span className="r">{this.state.detail.enterpriseLocation}</span>
							</li>
							<li className="item">
								<span className="l">邮政编码</span>
								<span className="r">{this.state.detail.postalcode}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	//获取机组成本数据
	getPowerPlantCost = () => {
		let params = `?participantId=${this.state.participantId}`
		api.GetPowerPlantCost(params).then(res => {
			if(res){
				if(res.status === 0){
					this.setState({
						powerPlantCost:res.data.rows,
						notPowerPlantCost:res.data.rows.length === 0 ? true : false
					})
				}
			}else{
				this.setState({
					notPowerPlantCost:true
				})
			}
		})
	}
	//机组成本
	unitCost = () => {
		return (
			<div className="module-list">
				<ul>
					{ !this.state.notPowerPlantCost && this.state.powerPlantCost.map((item,index) => {
						return 	<li className="item" key={index}>
											<span className="l">{item.generatorName}</span>
					<span className="r"><label>{item.startType}</label><label>{item.startDate}</label></span>
										</li>
					}) }
					{ this.state.notPowerPlantCost && <NoData/> }
				</ul>
			</div>
		)
	}

	//获取机组交易信息数据
	getPowerPlantTransactionInfo = () => {
		let params = `?participantId=${this.state.participantId}`
		api.GetPowerPlantTransactionInfo(params).then(res => {
			if (res) {
				if (res.status === 0) {
					this.setState({
						powerPlantTransactionInfo: res.data.rows,
						notpowerPlantTransactionInfo: res.data.rows === 0 ? true : false
					})
				}
			}else{
				this.setState({
					notpowerPlantTransactionInfo:true
				})
			}
		})
	}
	//交易信息
	transactionInformation = () => {
		return (
			<div>
				{!this.state.notpowerPlantTransactionInfo && <div>
					<div className="transactioninfo">
						<div className="l">
							<h3>时间</h3>
							<ul>
								{this.state.powerPlantTransactionInfo.map((item,index) => {
									return <li key={index}>{item.dateTime}</li>
								})}
							</ul>
						</div>
						<div className="r">
							<div style={{ overflowX: "auto" }}>
								<div className="list">
									<ul>
										<li>基数电量</li>
										{this.state.powerPlantTransactionInfo.map((item,index) => {
											return <li key={index}>{item.baseEle}</li>
										})}
									</ul>
								</div>
								<div className="list">
									<ul>
										<li>省内电量</li>
										{this.state.powerPlantTransactionInfo.map((item,index) => {
											return <li key={index}>{item.inEle}</li>
										})}
									</ul>
								</div>
								<div className="list">
									<ul>
										<li>省外电量</li>
										{this.state.powerPlantTransactionInfo.map((item,index) => {
											return <li key={index}>{item.outEle}</li>
										})}
									</ul>
								</div>
								<div className="list">
									<ul>
										<li>议价期期望</li>
										{this.state.powerPlantTransactionInfo.map((item,index) => {
											return <li key={index}>{item.expectation}</li>
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>}
				{this.state.notpowerPlantTransactionInfo && <NoData/>}
			</div>
		)
	}

	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='发电企业' back={true} search={false}></Header>
				<div className="housenum">
					<div className="power_user">
						<h3>{getDataQuery('companyName')}</h3>
						<div className="list">
							<ul>
								<li><span>地址：</span>{getDataQuery('address')}</li>
								<li><span>联系人：</span>{getDataQuery('user')}</li>
								<li><span>联系手机：</span>{getDataQuery('tel')}</li>
							</ul>
							<div className="clear"></div>
						</div>
					</div>
					<div className="module-space"></div>
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
							{this.state.active === '1' && this.electricityGenerationDet()}
							{this.state.active === '2' && this.unitCost()}
							{this.state.active === '3' && this.transactionInformation()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}