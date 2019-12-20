import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import api from '../api/index';
import { getDataQuery } from '../utils/index';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: `${getDataQuery('id')}`,
			isNotData: false,
			detail: {},
		}
	}
	componentWillMount() {
		this.getData()
	}
	getData = () => {
		let params = `?id=${this.state.id}`
		api.GetSellingElectricityDetail(params).then(res => {
			if (res.status === 0) {
				//let companyNature = res.data.companyNature['id']
				let detail = {}
				detail.companyName = res.data.name.value || '' //公司名称
				detail.companyNature = res.data['companyNature.id'].value ? res.data['companyNature.id'].options.filter(v => v.value === res.data['companyNature.id'].value)[0].text : '' //公司性质
				detail.address = res.data['adminRegion.id'].value ? res.data['adminRegion.id'].options.filter(v => v.value === res.data['adminRegion.id'].value)[0].text : '' //地理区域
				detail.companyScale = res.data['companyScale.id'].value ? res.data['companyScale.id'].options.filter(v => v.value === res.data['companyScale.id'].value)[0].text : '' //公司规模
				detail.abilityToSell = res.data.abilityToSell.value || '' //售电能力
				detail.entrustWay = res.data['entrustWay.id'].value ? res.data['entrustWay.id'].options.filter(v => v.value === res.data['entrustWay.id'].value)[0].text : '' //委托方式
				detail.backgroud = res.data['backgroud.id'].value ? res.data['backgroud.id'].options.filter(v => v.value === res.data['backgroud.id'].value)[0].text : '' //公司背景
				detail.subject = res.data.subject.value || '' //投资主体
				detail.legalPersonName = res.data.legalPersonName.value || '' //法人姓名
				detail.registerCaptial = res.data.registerCaptial.value || '' //注册资金
				detail.businessLicenseCode = res.data.businessLicenseCode.value || '' //法人营业执照注册号
				detail.registerAddress = res.data.registerAddress.value || '' //企业注册地址
				detail.organizationCode = res.data.organizationCode.value || '' //组织机构代码
				detail.depositBank = res.data.depositBank.value || '' //开户银行
				detail.depositAccountName = res.data.depositAccountName.value || '' //开户名称
				detail.depositAccountNo = res.data.depositAccountNo.value || '' //开户账号
				detail.businessLicense = res.data['businessLicense.id'].value[0].name || '' //营业执照副本
				this.setState({
					detail: detail
				})
			}
		})
	}
	componentDidMount() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}

	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='售电公司' back={true} search={false}></Header>
				<div className="housenum">
					<div className="cont">
						<div>
							<div className="contract-mes">
								<ModuleTit title="基本信息" imgurl={img1} >
								</ModuleTit>
								<div className="module-list">
									<ul>
										<li className="item">
											<span className="l">公司名称</span>
											<span className="r">{this.state.detail.companyName}</span>
										</li>
										<li className="item">
											<span className="l">公司性质</span>
											<span className="r">{this.state.detail.companyNature}</span>
										</li>
										<li className="item">
											<span className="l">所在区域</span>
											<span className="r">{this.state.detail.address}</span>
										</li>
										<li className="item">
											<span className="l">公司规模</span>
											<span className="r">{this.state.detail.companyScale}</span>
										</li>
										<li className="item">
											<span className="l">售电能力</span>
											<span className="r">{this.state.detail.abilityToSell}</span>
										</li>
										<li className="item">
											<span className="l">委托方式</span>
											<span className="r">{this.state.detail.entrustWay}</span>
										</li>
										<li className="item">
											<span className="l">公司背景</span>
											<span className="r">{this.state.detail.backgroud}</span>
										</li>
										<li className="item">
											<span className="l">投资主体</span>
											<span className="r">{this.state.detail.subject}</span>
										</li>
									</ul>
									<div className="module-space"></div>
									<ModuleTit title="注册信息" imgurl={img2} />
									<ul>
										<li className="item">
											<span className="l">法人名称</span>
											<span className="r">{this.state.detail.legalPersonName}</span>
										</li>
										<li className="item">
											<span className="l">注册资金</span>
											<span className="r">{this.state.detail.registerCaptial}</span>
										</li>
										<li className="item">
											<span className="l">法人营业执照注册号</span>
											<span className="r">{this.state.detail.businessLicenseCode}</span>
										</li>
										<li className="item">
											<span className="l">企业注册地址</span>
											<span className="r">{this.state.detail.registerAddress}</span>
										</li>
										<li className="item">
											<span className="l">组织机构代码</span>
											<span className="r">{this.state.detail.organizationCode}</span>
										</li>
										<li className="item">
											<span className="l">开户银行</span>
											<span className="r">{this.state.detail.depositBank}</span>
										</li>
										<li className="item">
											<span className="l">开户名称</span>
											<span className="r">{this.state.detail.depositAccountName}</span>
										</li>
										<li className="item">
											<span className="l">开户账号</span>
											<span className="r">{this.state.detail.depositAccountNo}</span>
										</li>
										<li className="item">
											<span className="l">营业执照副本</span>
											<span className="r">{this.state.detail.businessLicense}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}