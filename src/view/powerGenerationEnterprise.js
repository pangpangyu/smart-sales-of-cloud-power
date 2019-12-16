import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img3 from '../assets/img/img204.png';
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import { baseImgUrl } from '../config/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
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
			detail:{}
		}
	}
	componentWillMount() {
		const that = this
		that.getPowerPlantDetail()
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
				detail.province = res.data.address.value ? res.data.address.options.filter(v => v.value === res.data.address.value)[0].text : ''
				detail.address = res.data['address.id'].value ? res.data['address.id'].options.filter(v => v.value === res.data['address.id'].value)[0].text : '' //通讯地址
				detail.adminBureau = res.data.adminBureau.value || '' //工商管理局
				detail.adminRegion = res.data['adminRegion.id'].value ? res.data['adminRegion.id'].options.filter(v => v.value === res.data['adminRegion.id'].value)[0].text : '' //行政区域
				detail.companyStat = res.data['companyStat'].value ? res.data['companyStat'].options.filter(v => v.value === res.data['companyStat'].value)[0].text : '' //状态
				// detail.telephone = res.data.telephone.value || '' //电话
				// detail.companyStat = res.data['companyStat'].value ? res.data['companyStat'].options.filter(v => v.value === res.data['companyStat'].value)[0].text : '' //状态
				// detail.marketTime = res.data.marketTime.value || '' // 入市日期
				// detail.delistingTime = res.data.delistingTime.value || '' //退市时间
				// detail.address = res.data['adminRegion.id'].value ? res.data['adminRegion.id'].options.filter(v => v.value === res.data['adminRegion.id'].value)[0].text : '' //地理区域
				// detail.businessLicense = res.data['businessLicense.id'].url || '' //营业执照
				// detail.businessRegisterAddress = res.data.businessRegisterAddress.value || '' //企业注册地址
				// detail.businessScope = res.data.businessScope.value || '' //业务范围
				// detail.clientType = res.data['clientType.id'].value ? res.data['clientType.id'].options.filter(v => v.value === res.data['clientType.id'].value)[0].text : '' //用户类别
				// detail.code = res.data.code.value //代码
				// detail.depositAccountName = res.data.depositAccountName.value || '' //存款帐户名
				// detail.depositBank = res.data.depositBank.value || '' //存款银行
				// detail.electricityAddress = res.data['electricityType.id'].value ? res.data['electricityType.id'].options.filter(v => v.value === res.data['electricityType.id'].value)[0].text : '' //用电类别
				// detail.enterpriseNature = res.data['enterpriseNature.id'].value ? res.data['enterpriseNature.id'].options.filter(v => v.value === res.data['enterpriseNature.id'].value)[0].text : '' //企业性质
				// detail.establishTime = res.data.establishTime.value || '' //成立时间
				// detail.fax = res.data.fax.value || '' //传真
				// detail.id = res.data.id.value
				// detail.income = res.data.income.value || '' //收入
				// detail.industryCategory = res.data['industryCategory.id'].value ? res.data['industryCategory.id'].options.filter(v => v.value === res.data['industryCategory.id'].value)[0].text : '' || '' //工业类别
				// detail.legalPersonName = res.data.legalPersonName.value || '' //法人姓名
				// detail.legalRepresentative = res.data.legalRepresentative.value || '' //法定代表人
				// detail.legalRepresentativeLink = res.data.legalRepresentativeLink.value || '' //法人代表联系方式
				// detail.maxSupplyVoltage = res.data.maxSupplyVoltage.value || '' //最大供电电压
				// detail.tradeType = res.data['tradeType.id'].value ? res.data['tradeType.id'].options.filter(v => v.value === res.data['tradeType.id'].value)[0].text : '' //交易类型
				// detail.socialCreditNumber = res.data.socialCreditNumber.value || '' //统一社会信用代码
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
								<span className="r">信息技术有限公司</span>
							</li>
							<li className="item">
								<span className="l">电厂简称</span>
								<span className="r">公司</span>
							</li>
							<li className="item">
								<span className="l">所属集团</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">企业性质</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">所属省级电网公司</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">所属地级电网公司</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">调度关系</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">状态</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">行政区域</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">股权结构</span>
								<span className="r"></span>
							</li>
						</ul>
						<div className="module-space"></div>
						<ModuleTit title="联系信息" imgurl={img3} />
						<ul>
							<li className="item">
								<span className="l">联系人</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">联系电话</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">手机</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">传真</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">详细地址</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">邮政编码</span>
								<span className="r"></span>
							</li>
						</ul>
					</div>
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
	//交易信息
	transactionInformation = () => {
		return (
			<div>
				<div className="transactioninfo">
					<div className="l">
						<h3>时间</h3>
						<ul>
							<li>2019-01</li>
							<li>2019-02</li>
							<li>2019-03</li>
							<li>2019-04</li>
							<li>2019-05</li>
						</ul>
					</div>
					<div className="r">
						<div style={{ overflowX: "auto" }}>
							<div className="list">
								<ul>
									<li>基数电量</li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</div>
							<div className="list">
								<ul>
									<li>省内电量</li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</div>
							<div className="list">
								<ul>
									<li>省外电量</li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</div>
							<div className="list">
								<ul>
									<li>议价期期望</li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='发电企业' back={true} search={false}></Header>
				<div className="housenum">
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