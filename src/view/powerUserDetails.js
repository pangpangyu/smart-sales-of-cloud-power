import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import { Link } from 'react-router-dom';
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
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
                { id: '1', title: '基本信息' },
                { id: '2', title: '户号信息' },
                { id: '3', title: '账号管理' },
                { id: '4', title: '年预计电量' }
            ],
            active: '1',
            id: `${getDataQuery('id')}`,
            participantId: `${getDataQuery('participantId')}`,
            detail: {},
            isNotData: false,
            HouseholdInfoList: [],
            open: false,
            time: new Date(),
            fullYear:'',
            year: '2019',
        }
    }
    getDate = () => {
        const that = this
        this.setState({
            year: this.state.fullYear,
            open: false
        })
    }
    onChange = (value) => {
        let fullYear = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        this.setState({
            fullYear:fullYear,
            time:value
        });
    };
    componentWillMount() {
        const that = this
        that.getPowerUserDet()
        that.getHouseholdInfo()
        that.getCompanyStaffTableData()
        that.getYearPowerTableData()
    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
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
    //电力用户基本信息
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
                                    {this.state.detail.businessLicense ? <Link to={`/imaView?url=${baseImgUrl + this.state.detail.businessLicense}`}>{this.state.detail.businessLicense ? '有' : ''}</Link> : '无'}
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

    //电力用户户号信息
    getHouseholdInfo = () => {
        const that = this
        let params = `?participantId=${this.state.participantId}`//${this.state.id}
        api.GetPowerUsersMemberInfo(params).then(res => {
            if (res.status === 0) {
                that.setState({
                    HouseholdInfoList: res.data.rows,
                    isNotData: res.data.rows.length === 0 ? true : false
                })
            }
        })
    }
    //电力用户户号信息
    householdInformation = () => {
        return (
            <div className="contract-mes">
                <div className="module-list">
                    <ul>
                        {this.state.HouseholdInfoList.map(item => {
                            return <li className="item" key={item.id}>
                                <span className="l">{item.marketChargeNumber}</span>
                                <span className="r"><label>{item.powerUnit}</label><label>{item.electricUnit}</label></span>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    //电力用户账号管理
    getCompanyStaffTableData = () => {
        let params = `?participantId=${this.state.participantId}`
        api.GetPowerUsersMemberManage(params).then(res => {
            if (res.status === 0) {
                this.setState({
                    list: res.data.rows
                })
            }
        })
    }
    //电力用户账号管理
    CompanyStaffTable = () => {
        return (
            <div className="module-list2">
                {this.state.list && this.state.list.map((item, index) => {
                    return <div style={{ marginBottom: '20px' }} key={item.id}>
                        <Link to={`/account/${item.id}?u=${index}&pid=${this.state.id}`}>
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
            </div>
        )
    }

    //年度预计电量
    getYearPowerTableData = () => {
        let params = `?participantId=${this.state.participantId}`
        api.GetPowerYearEstimate(params).then(res => {
            if (res.status === 0) {
                let yearPowerTab = []
                yearPowerTab[0] = res.data.rows[0].jan
                yearPowerTab[1] = res.data.rows[0].feb
                yearPowerTab[2] = res.data.rows[0].mar
                yearPowerTab[3] = res.data.rows[0].apr
                yearPowerTab[4] = res.data.rows[0].may
                yearPowerTab[5] = res.data.rows[0].jun
                yearPowerTab[6] = res.data.rows[0].jul
                yearPowerTab[7] = res.data.rows[0].aug
                yearPowerTab[8] = res.data.rows[0].sep
                yearPowerTab[9] = res.data.rows[0].oct
                yearPowerTab[10] = res.data.rows[0].nov
                yearPowerTab[11] = res.data.rows[0].dec_
                this.setState({
                    yearPowerTab: yearPowerTab,
                    electricTotal: res.data.rows[0].total,
                    year: res.data.rows[0].yearDate
                })
                console.log(this.state.yearPowerTab)
            }
        })
    }
    //电力用户年度预计电量
    YearPowerTable = () => {
        return (
            <div className="annualEstimatedPower">
                <div className="chooes-year">
                    <div className="l">选择年份</div>
                    <div className="r" onClick={() => this.setState({ open: true })}>
                        {this.state.year}<i className="iconfont iconxiala-copy" style={{ fontSize: '10px', color: '#cccccc' }}></i>
                    </div>
                </div>
                <div className="power-totle" style={{ textAlign: 'center', fontSize: '11px', color: '#999999', padding: '30px 0', lineHeight: '18px' }}>
                    <p><span style={{ fontSize: '16px', color: '#2b2a30', marginRight: '3px' }}>{this.state.electricTotal}</span>兆瓦时</p>
                    <p>电量合计</p>
                </div>
                <div className="m-list">
                    <ul>
                        {this.state.yearPowerTab && this.state.yearPowerTab.map((item, index) => {
                            return <li key={index}><p className="p1">{index + 1}月</p><p className="p2">{item}</p></li>
                        })}
                    </ul>
                    <div className="clear"></div>
                </div>
                <div className={this.state.open ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="year"
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

    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='电力用户' back={true} search={false}></Header>
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
                            {this.state.active === '1' && this.powerUsersDet()}
                            {this.state.active === '2' && this.householdInformation()}
                            {this.state.active === '3' && this.CompanyStaffTable()}
                            {this.state.active === '4' && this.YearPowerTable()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}