import React, { Fragment } from 'react';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import img3 from '../assets/img/img204.png';
import api from '../api/index';
import { baseImgUrl } from '../config/index';
import { Link } from 'react-router-dom';
/*
客户管理-详情
*/

class PowerDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id:this.props.id,
			detail:{}
		}
	}

	componentWillMount(){
		if(this.props.type === '1'){
			this.getPowerUserDet()
		}
	}

	//电力用户详情基本信息
	getPowerUserDet = () => {
		const that = this
		let params = `?id=${this.state.id}`
		api.GetPowerUsersDetail(params).then(res => {
			if (res.status === 0) {
				let detail = {}
				detail.companyName = res.data.name.value || '' //企业全称
				detail.shortName = res.data.shortName.value || '' //企业简称
				detail.enterpriseLocation = res.data.enterpriseLocation.value || '' //企业所在地
				detail.usedName = res.data.usedName.value || '' //曾用名
				detail.telephone = res.data.telephone.value || '' //电话
				detail.companyStat = res.data['companyStat'].value ? res.data['companyStat'].options.filter(v => v.value === res.data['companyStat'].value)[0].text : '' //状态
				detail.marketTime = res.data.marketTime.value || '' // 入市日期
				detail.delistingTime = res.data.delistingTime.value || '' //退市时间
				detail.address = res.data['adminRegion.id'].value ? res.data['adminRegion.id'].options.filter(v => v.value === res.data['adminRegion.id'].value)[0].text : '' //地理区域
				detail.businessLicense = res.data['businessLicense.id'].url || '' //营业执照
				detail.businessRegisterAddress = res.data.businessRegisterAddress.value || '' //企业注册地址
				detail.businessScope = res.data.businessScope.value || '' //业务范围
				detail.clientType = res.data['clientType.id'].value ? res.data['clientType.id'].options.filter(v => v.value === res.data['clientType.id'].value)[0].text : '' //用户类别
				detail.code = res.data.code.value //代码
				detail.depositAccountName = res.data.depositAccountName.value || '' //存款帐户名
				detail.depositBank = res.data.depositBank.value || '' //存款银行
				detail.electricityAddress = res.data['electricityType.id'].value ? res.data['electricityType.id'].options.filter(v => v.value === res.data['electricityType.id'].value)[0].text : '' //用电类别
				detail.enterpriseNature = res.data['enterpriseNature.id'].value ? res.data['enterpriseNature.id'].options.filter(v => v.value === res.data['enterpriseNature.id'].value)[0].text : '' //企业性质
				detail.establishTime = res.data.establishTime.value || '' //成立时间
				detail.fax = res.data.fax.value || '' //传真
				detail.id = res.data.id.value
				detail.income = res.data.income.value || '' //收入
				detail.industryCategory = res.data['industryCategory.id'].value ? res.data['industryCategory.id'].options.filter(v => v.value === res.data['industryCategory.id'].value)[0].text : '' || '' //工业类别
				detail.legalPersonName = res.data.legalPersonName.value || '' //法人姓名
				detail.legalRepresentative = res.data.legalRepresentative.value || '' //法定代表人
				detail.legalRepresentativeLink = res.data.legalRepresentativeLink.value || '' //法人代表联系方式
				detail.maxSupplyVoltage = res.data.maxSupplyVoltage.value || '' //最大供电电压
				detail.tradeType = res.data['tradeType.id'].value ? res.data['tradeType.id'].options.filter(v => v.value === res.data['tradeType.id'].value)[0].text : '' //交易类型
				detail.socialCreditNumber = res.data.socialCreditNumber.value || '' //统一社会信用代码
				that.setState({
					detail: detail
				})
			}
		})
	}

	//电力用户详情
	powerUsersDet = () => {
		return (
			<div>
				<div className="contract-mes">
					<ModuleTit title="基本信息" imgurl={img1} >
					</ModuleTit>
					<div className="module-list">
						<ul>
							<li className="item">
								<span className="l">企业全称</span>
								<span className="r">{this.state.detail.companyName}</span>
							</li>
							<li className="item">
								<span className="l">企业简称</span>
								<span className="r">{this.state.detail.shortName}</span>
							</li>
							<li className="item">
								<span className="l">曾用名</span>
								<span className="r">{this.state.detail.usedName}</span>
							</li>
							<li className="item">
								<span className="l">状态</span>
								<span className="r">{this.state.detail.companyStat}</span>
							</li>
							<li className="item">
								<span className="l">入市日期</span>
								<span className="r">{this.state.detail.marketTime}</span>
							</li>
							<li className="item">
								<span className="l">退市日期</span>
								<span className="r">{this.state.detail.delistingTime}</span>
							</li>
							<li className="item">
								<span className="l">地理区域</span>
								<span className="r">{this.state.detail.address}</span>
							</li>
							<li className="item">
								<span className="l">用电类别</span>
								<span className="r">{this.state.detail.electricityAddress}</span>
							</li>
							<li className="item">
								<span className="l">企业所在地</span>
								<span className="r">{this.state.detail.enterpriseLocation}</span>
							</li>
							<li className="item">
								<span className="l">交易类型</span>
								<span className="r">{this.state.detail.tradeType}</span>
							</li>
							<li className="item">
								<span className="l">用户类型</span>
								<span className="r">{this.state.detail.clientType}</span>
							</li>
							<li className="item">
								<span className="l">联系电话</span>
								<span className="r">{this.state.detail.telephone}</span>
							</li>
							<li className="item">
								<span className="l">传真</span>
								<span className="r">{this.state.detail.fax}</span>
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
								<span className="l">企业注册地址</span>
								<span className="r">{this.state.detail.businessRegisterAddress}</span>
							</li>
							<li className="item">
								<span className="l">法人代表</span>
								<span className="r">{this.state.detail.legalRepresentative}</span>
							</li>
							<li className="item">
								<span className="l">法人代表联系方式</span>
								<span className="r">{this.state.detail.legalRepresentativeLink}</span>
							</li>
							<li className="item">
								<span className="l">统一社会信用代码</span>
								<span className="r">{this.state.detail.socialCreditNumber}</span>
							</li>
							<li className="item">
								<span className="l">营业执照副本</span>
								<span className="r">
									{ this.state.detail.businessLicense ? <Link to={`/imaView?url=${baseImgUrl + this.state.detail.businessLicense}`}>{this.state.detail.businessLicense?'有':''}</Link> : '无' }
									{/* { this.state.detail.businessLicense ? <a href={baseImgUrl + this.state.detail.businessLicense}>有</a> : '无' } */}
								</span>
							</li>
							<li className="item">
								<span className="l">开户许可证</span>
								<span className="r">{this.state.detail.companyName}</span>
							</li>
							<li className="item">
								<span className="l">委托授权书</span>
								<span className="r">{this.state.detail.companyName}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
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
	//合作方详情
	partnersDet = () => {
		return (
			<div>
				<div className="contract-mes">
					<ModuleTit title="基本信息" imgurl={img1} >
					</ModuleTit>
					<div className="module-list">
						<ul>
							<li className="item">
								<span className="l">客户名称</span>
								<span className="r">信息技术有限公司</span>
							</li>
							<li className="item">
								<span className="l">企业性质</span>
								<span className="r">公司</span>
							</li>
							<li className="item">
								<span className="l">企业类型</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">行政区域</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">注册资本</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">电话</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">传真</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">邮政编码</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">企业所在地</span>
								<span className="r"></span>
							</li>
						</ul>
						<div className="module-space"></div>
						<ModuleTit title="注册信息" imgurl={img2} />
						<ul>
							<li className="item">
								<span className="l">法人名称</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">性别</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">证件类型</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">法人证件号码</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">工商行政管理局</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">组织机构代码</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户银行</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户名称</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户账号</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">注册地址</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">营业执照副本</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户许可证</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">委托授权书</span>
								<span className="r"></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
	//售电公司详情
	sellingElectricityDet = () => {
		return (
			<div>
				<div className="contract-mes">
					<ModuleTit title="基本信息" imgurl={img1} >
					</ModuleTit>
					<div className="module-list">
						<ul>
							<li className="item">
								<span className="l">公司名称</span>
								<span className="r">信息技术有限公司</span>
							</li>
							<li className="item">
								<span className="l">公司性质</span>
								<span className="r">公司</span>
							</li>
							<li className="item">
								<span className="l">所在区域</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">公司规模</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">售电能力</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">委托方式</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">公司背景</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">投资主体</span>
								<span className="r"></span>
							</li>
						</ul>
						<div className="module-space"></div>
						<ModuleTit title="注册信息" imgurl={img2} />
						<ul>
							<li className="item">
								<span className="l">法人名称</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">注册资金</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">法人营业执照注册号</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">企业注册地址</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">组织机构代码</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户银行</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户名称</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">开户账号</span>
								<span className="r"></span>
							</li>
							<li className="item">
								<span className="l">营业执照副本</span>
								<span className="r"></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<Fragment>
				{this.props.type === '1' && this.powerUsersDet()}
				{this.props.type === '2' && this.electricityGenerationDet()}
				{this.props.type === '3' && this.partnersDet()}
				{this.props.type === '4' && this.sellingElectricityDet()}
			</Fragment>
		)
	}
}

export default PowerDetails;