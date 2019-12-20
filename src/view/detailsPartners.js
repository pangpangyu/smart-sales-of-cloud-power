import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import { Link } from 'react-router-dom';
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			tabs: [
				{ id: '1', title: '基本信息' },
				{ id: '2', title: '账号管理' }
			],
			value: null,
			active: '1',
			id: `${getDataQuery('id')}`,
			participantId: `${getDataQuery('participantId')}`,
			isNotData: false,
			accountManagementList: [],
			detail:{},
			notPartnersUser:false
		}
	}
	componentWillMount() {
		const that = this
		that.getPartnersUserDetail()
		that.getPartnersUserMemberManage()
	}
	componentDidMount() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
	//账号详情
	getPartnersUserDetail = () => {
		let params = `?id=${this.state.id}`
		api.GetPartnersUserDetail(params).then(res => {
			if (res.status === 0) {
				let detail = {}
				detail.name = res.data.name.value //客户名称
				detail.enterpriseNature = res.data['enterpriseNature.id'].value ? res.data['enterpriseNature.id'].options.filter(v => v.value === res.data['enterpriseNature.id'].value)[0].text : '' //企业性质
				detail.enterpriseCategory = res.data['enterpriseCategory.id'].value ? res.data['enterpriseCategory.id'].options.filter(v => v.value === res.data['enterpriseCategory.id'].value)[0].text : '' //企业类型
				detail.adminBureau = res.data.adminBureau.value || '' //工商管理局
				detail.registerCaptial = res.data.registerCaptial.value //注册资本
				detail.fax = res.data.fax.value || '' //传真
				detail.telephone = res.data.telephone.value || '' //电话
				detail.postalcode = res.data.postalcode.value || '' //邮政编码
				detail.enterpriseLocation = res.data.enterpriseLocation.value || '' //企业所在地
				detail.legalPersonName = res.data.legalPersonName.value || '' //法人姓名
				detail.legalPersonSex = res.data['legalPersonSex'].value ? res.data['legalPersonSex'].options.filter(v => v.value === res.data['legalPersonSex'].value)[0].text : '' //性别
				detail.legalPersonIdType = res.data['legalPersonIdType.id'].value ? res.data['legalPersonIdType.id'].options.filter(v => v.value === res.data['legalPersonIdType.id'].value)[0].text : '' //证件类型
				detail.legalPersonId = res.data.legalPersonId.value || '' //证件号
				detail.organizationCode = res.data.organizationCode.value//组织机构代码
				detail.depositBank = res.data.depositBank.value || '' //开户银行
				detail.depositAccountName = res.data.depositAccountName.value || '' //开户名称
				detail.depositAccountNo = res.data.depositAccountNo.value //账号
				detail.registerAddress = res.data.registerAddress.value //注册地址
				this.setState({
					detail: detail
				})
			}
		})
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
								<span className="r">{this.state.detail.name}</span>
							</li>
							<li className="item">
								<span className="l">企业性质</span>
								<span className="r">{this.state.detail.enterpriseNature}</span>
							</li>
							<li className="item">
								<span className="l">企业类型</span>
								<span className="r">{this.state.detail.enterpriseCategory}</span>
							</li>
							<li className="item">
								<span className="l">行政区域</span>
								<span className="r">{this.state.detail.name}</span>
							</li>
							<li className="item">
								<span className="l">注册资本</span>
								<span className="r">{this.state.detail.registerCaptial}</span>
							</li>
							<li className="item">
								<span className="l">电话</span>
								<span className="r">{this.state.detail.telephone}</span>
							</li>
							<li className="item">
								<span className="l">传真</span>
								<span className="r">{this.state.detail.fax}</span>
							</li>
							<li className="item">
								<span className="l">邮政编码</span>
								<span className="r">{this.state.detail.postalcode}</span>
							</li>
							<li className="item">
								<span className="l">企业所在地</span>
								<span className="r">{this.state.detail.enterpriseLocation}</span>
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
								<span className="l">性别</span>
								<span className="r">{this.state.detail.legalPersonSex}</span>
							</li>
							<li className="item">
								<span className="l">证件类型</span>
								<span className="r">{this.state.detail.legalPersonIdType}</span>
							</li>
							<li className="item">
								<span className="l">法人证件号码</span>
								<span className="r">{this.state.detail.legalPersonId}</span>
							</li>
							<li className="item">
								<span className="l">工商行政管理局</span>
								<span className="r">{this.state.detail.adminBureau}</span>
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
								<span className="l">注册地址</span>
								<span className="r">{this.state.detail.registerAddress}</span>
							</li>
							<li className="item">
								<span className="l">营业执照副本</span>
								<span className="r">-</span>
							</li>
							<li className="item">
								<span className="l">开户许可证</span>
								<span className="r">-</span>
							</li>
							<li className="item">
								<span className="l">委托授权书</span>
								<span className="r">-</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
	
	getPartnersUserMemberManage = () => {
		let params = `?participantId=${this.state.participantId}`
		api.GetPartnersUserMemberManage(params).then(res => {
			if(res){
				if(res.status === 0){
					this.setState({
						accountManagementList:res.data.rows,
						notPartnersUser:res.data.rows.length === 0 ? true : false
					})
				}
			}else{

			}
		})
	}
	accountManagement = () => {
		return (
			<div className="module-list2">
				{!this.state.notPartnersUser && this.state.accountManagementList.map((item, index) => {
					return <div style={{ marginBottom: '20px' }} key={item.id}>
						<Link to={`/account/${item.id}?u=${index}&pid=${this.state.participantId}`}>
							<div className="title" style={{ fontSize: '15px', color: '#2b2a30', padding: '12px 15px' }}>{item.name} {item.isContactPerson === '是' ? '(常)' : ''} </div>
							<div className="item">
								<div className="l">邮箱</div>
								<div className="r">{item.mail}</div>
							</div>
							<div className="item">
								<div className="l">手机</div>
								<div className="r">{item.mobilePhone}</div>
							</div>
							<div className="item">
								<div className="l">账号</div>
								<div className="r">{item.account}</div>
							</div>
							<div className="item">
								<div className="l">生日</div>
								<div className="r">{item.birthday}</div>
							</div>
						</Link>
					</div>
				})}
				{this.state.notPartnersUser && <NoData/>}
			</div>
		)
	}

	render() {
		return (
			<div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
				<Header title='合作方' back={true} search={false}></Header>
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
							{this.state.active === '1' && this.partnersDet()}
							{this.state.active === '2' && this.accountManagement()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}