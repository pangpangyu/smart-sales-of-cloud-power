import React from 'react'
import Header from '../components/header'
import NoData from '../components/noData'
import WholesaleMarket from './wholesaleMarket'
import RetailMarket from './retailMarket'
import SettlementElectricity from './settlementElectricity'
import Search from '../components/search';
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import api from '../api/index';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { id: '1', title: '批发市场' },
                { id: '2', title: '零售市场' },
                { id: '3', title: '售电公司' }
            ],
            active: '1',
            WholesaleMarketList: [],
            WholesaleMarketListTotal: {},
            WholesaleMarketOpen: false,
            WholesaleMarketTime: new Date(),
            WholesaleMarketMonth: (new Date().getMonth() + 1),
            WholesaleMarketFullYear: new Date().getFullYear(),
            WholesaleMarketYear: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            WholesaleMarketNodata:false,
            retailMarketList: [],
            retailMarketOrdinaryList: [],//结算管理零售市场普通列表
            retailMarketOrdinaryListSum: {},//结算管理零售市场普通列表合计
            retailMarketAkeyList: [],//结算管理零售市场重点列表
            retailMarketAkeyListSum: {},//结算管理零售市场重点列表合计
            retailMarketOpen: false,
            retailMarketTime: new Date(),
            retailMarketMonth: (new Date().getMonth() + 1),
            retailMarketFullYear: new Date().getFullYear(),
            retailMarketYear: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            settlementElectricityList: [
                { id: 1, title: '国网山西电力公司', n1: '1000', n2: '20', n3: '1000', icon: 'iconqiyejibenxinxi' },
                { id: 2, title: '山西地方电力有限公司', n1: '1000', n2: '20', n3: '1000', icon: 'iconqiyejibenxinxi' },
                { id: 3, title: '合计', n1: '1000', n2: '20', n3: '1000', icon: 'iconjiage' }
            ],
            settlementElectricityListSum:{},
            settlementElectricityOpen: false,
            settlementElectricityTime: new Date(),
            settlementElectricityMonth: (new Date().getMonth() + 1),
            settlementElectricityFullYear: new Date().getFullYear(),
            settlementElectricityYear: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            retailMarketListIsNoData: false,
            settlementElectricityIsNoData: false,
            retailMarketCxList:[]
        }
    }
    componentWillMount() {
        const that = this
        that.getWholesaleMarket()
        that.getRetailMarketData()
        that.getSettlementElectricityData()
    }
    //批发市场列表收起展开
    WholesaleMarketChgCheck(e) {
        let list = this.state.WholesaleMarketList;
        list[e].check = !list[e].check;
        this.setState({
            WholesaleMarketList: list
        })
    }
    //结算管理批发市场
    getWholesaleMarket = () => {
        const that = this
        let params = {
            rowNumber: 0,
            pageSize: 10,
            yearMon1: 1,
            yearMon: that.state.WholesaleMarketYear
        }
        api.getWholesaleMarket(params).then(res => {
            if (res.status === 0) {
                if (res.data.rows.length > 0) {
                    let arr = res.data.rows
                    arr.map(item => {
                        item.icon = 'iconqiyejibenxinxi'
                    })
                    if(arr.length > 0){
                        arr[arr.length - 1].icon = 'iconjiage'
                    }
                    this.setState({
                        WholesaleMarketList: arr,
                        WholesaleMarketNodata:false
                    })
                } else {
                    this.setState({
                        WholesaleMarketList: res.data.rows,
                        WholesaleMarketNodata:true
                    })
                }
            }
        })
    }
    //结算管理批发市场
    wholesaleMarket = () => {
        return (
            <div className="settlement_manage">
                <div className="selection_date">
                    <p>选择日期<span onClick={() => this.setState({ WholesaleMarketOpen: true })}>{this.state.WholesaleMarketYear}</span></p>
                </div>
                {this.state.WholesaleMarketList && this.state.WholesaleMarketList.map((item, index) => {
                    return <div className="tab" key={item.id}>
                        <div className="item">
                            <div className="list">
                                <h3><i className={['iconfont ', item.icon].join('')}></i><span>{item.type}交易</span></h3>
                                <ul className={item.check ? 'active' : ''} onClick={() => this.WholesaleMarketChgCheck(index)}>
                                    <li><p>批发市场电费：<span>{item.settleFee}</span>元/兆瓦时</p></li>
                                    <li><p>偏差考核电费：<span>{item.devAssFee}</span>元/兆瓦时</p></li>
                                    <li><p>成交电量：<span>{item.contractPower}</span>兆瓦时</p></li>
                                    <li><p>结算电量：<span>{item.realPower}</span>兆瓦时</p></li>
                                    <li><p>成交均价：<span>{item.contractPrice}</span>兆瓦时</p></li>
                                    <li><p>偏差考核电量：<span>{item.devAssPower}</span>兆瓦时</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
                {this.state.WholesaleMarketNodata && <div style={{background:'#fff'}}><NoData /></div>}
                <div className={this.state.WholesaleMarketOpen ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ WholesaleMarketOpen: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="month"
                            locale={enUs}
                            value={this.state.WholesaleMarketTime}
                            onChange={this.wholesaleMarketOnChange}
                        />
                        <div className="module-space"></div>
                        <div className="btns">
                            <Button className="btn" type="primary" onClick={() => this.setState({ WholesaleMarketOpen: false })}>取消</Button>
                            <Button className="btn btn1" type="primary" onClick={this.getWholesaleMarketDate}>确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //批发市场获取日期并调用数据
    getWholesaleMarketDate = () => {
        this.setState({
            WholesaleMarketYear: this.state.WholesaleMarketFullYear + '-' + this.state.WholesaleMarketMonth,
            WholesaleMarketOpen: false
        }, () => {
            this.getWholesaleMarket()
        })
    }
    //批发市场获取改变后的日期
    wholesaleMarketOnChange = (value) => {
        let fullYear = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        this.setState({
            WholesaleMarketMonth: month,
            WholesaleMarketFullYear: fullYear,
            WholesaleMarketTime: value
        });
    };

    //结算管理零售市场数据
    getRetailMarketData = () => {
        const that = this
        let params = {
            rowNumber: 0,
            pageSize: 10,
            yearMon1: 1,
            yearMon: that.state.retailMarketYear,
            companyPowerUser:{'name':''}
        }
        if(this.state.searchInput){
            params.companyPowerUser.name = this.state.searchInput
        }
        api.getRetailMarket(params).then(res => {
            if (res.status === 0) {
                if (res.data.rows.length > 0) {
                    let retailMarketOrdinaryList = []
                    let retailMarketAkeyList = []
                    let retailMarketList = []
                    let retailMarketCxList = []
                    res.data.rows.map(item => {
                        if (item.type === '普通') {
                            retailMarketOrdinaryList.push({ item })
                        }
                        if (item.type === '重点') {
                            retailMarketAkeyList.push({ item })
                        }
                        if (item.type === '长协') {
                            retailMarketCxList.push({ item })
                        }
                    })
                    let arr = retailMarketOrdinaryList
                    arr.map(item => {
                        item.item.icon = 'iconqiyejibenxinxi'
                    })
                    if(arr.length > 0){
                        arr[arr.length - 1].item.icon = 'iconjiage'
                    }
                    let arr2 = retailMarketAkeyList
                    arr2.map(item => {
                        item.item.icon = 'iconqiyejibenxinxi'
                    })
                    if(arr2.length > 0){
                        arr2[arr2.length - 1].item.icon = 'iconjiage'
                    }
                    if(retailMarketAkeyList.length > 0){
                        retailMarketList.push({ title: '重点交易', list: retailMarketAkeyList })
                    }
                    if(retailMarketOrdinaryList.length > 0){
                        retailMarketList.push({ title: '普通交易', list: retailMarketOrdinaryList })
                    }
                    if(retailMarketCxList.length > 0){
                        retailMarketCxList.map(item => {
                            item.item.icon = 'iconqiyejibenxinxi'
                        })
                        retailMarketCxList[retailMarketCxList.length - 1].item.icon = 'iconjiage'
                        retailMarketList.push({ title: '长协', list: retailMarketCxList })
                    }
                    // retailMarketList.push({ title: '重点交易', list: retailMarketAkeyList }, { title: '普通交易', list: retailMarketOrdinaryList })
                    this.setState({
                        retailMarketOrdinaryList: arr,
                        retailMarketAkeyList: arr2,
                        retailMarketList: retailMarketList,
                        retailMarketListIsNoData:false
                    })
                } else {
                    this.setState({
                        retailMarketList:res.data.rows,
                        retailMarketListIsNoData:true
                    })
                }
            }
        })
    }
    //结算管理零售市场
    retailMarket = () => {
        return (
            <div>
                <div className="settlement_manage">
                    <div className="selection_date">
                        <p>选择日期<span onClick={() => this.setState({ retailMarketOpen: true })}>{this.state.retailMarketYear}</span></p>
                    </div>
                    <div className="tab_box">
                        <Search title={'搜客户名称'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
                        {this.state.retailMarketList && this.state.retailMarketList.map((item, index) => {
                            return <div className="tab" key={index}>
                                <div className="tit">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="item">
                                    {item.list.map((v, k) => {
                                        return <div className="list" key={k}>
                                            <h3><i className={['iconfont ', v.item.icon].join('')}></i><span>{v.item.customerName}</span></h3>
                                            <ul className={v.check ? 'active' : ''} onClick={() => this.retailMarketChgCheck(index, k)}>
                                                <li><p>零售市场电费：<span>{v.item.userSettlementFee}</span>元/兆瓦时</p></li>
                                                <li><p>承担偏差电费：<span>{v.item.devAssFee}</span>元/兆瓦时</p></li>
                                                <li><p>电量计划：<span>{v.item.planPower}</span>/兆瓦时</p></li>
                                                <li><p>实际用电量：<span>{v.item.realElectricity}</span>/兆瓦时</p></li>
                                                <li><p>直接交易电量：<span>{v.item.userSettlementPower}</span>/兆瓦时</p></li>
                                                <li><p>协议电价：<span>{v.item.contractPrice}</span>元/兆瓦时</p></li>
                                            </ul>
                                        </div>
                                    })}
                                </div>

                            </div>
                        })}
                        
                        {this.state.retailMarketListIsNoData && <div style={{background:'#fff'}}><NoData /></div>}
                    </div>
                </div>
                <div className={this.state.retailMarketOpen ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ retailMarketOpen: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="month"
                            locale={enUs}
                            value={this.state.retailMarketTime}
                            onChange={this.retailMarketOnChange}
                        />
                        <div className="module-space"></div>
                        <div className="btns">
                            <Button className="btn" type="primary" onClick={() => this.setState({ retailMarketOpen: false })}>取消</Button>
                            <Button className="btn btn1" type="primary" onClick={this.getRetailMarketDate}>确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //零售市场列表收起展开
    retailMarketChgCheck(index, k) {
        let list = this.state.retailMarketList;
        list[index].list[k].check = !list[index].list[k].check
        this.setState({
            retailMarketList: list
        })
    }
    handleSearchInput = e => {
        // console.log(e.target.value);
        this.setState({
            searchInput: e.target.value
        })
    }
    handleSearchSubmit = e => {
        //console.log(this.state.searchInput);
        this.setState({
            contractManageList: []
        },() => {
            this.getRetailMarketData(1);
        })
        
    }
    //零售市场获取日期并调用数据
    getRetailMarketDate = () => {
        this.setState({
            retailMarketYear: this.state.retailMarketFullYear + '-' + this.state.retailMarketMonth,
            retailMarketOpen: false
        },() => {
            this.getRetailMarketData()
        })
    }
    //零售市场获取修改后日期
    retailMarketOnChange = (value) => {
        let fullYear = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        this.setState({
            retailMarketMonth: month,
            retailMarketFullYear: fullYear,
            retailMarketTime: value
        });
    };

    //结算管理售电公司数据
    getSettlementElectricityData = () => {
        const that = this
        let params = {
            rowNumber: 0,
            pageSize: 10,
            yearMon1: 1,
            yearMon: this.state.settlementElectricityYear
        }
        api.getElectricitySaleCompany(params).then(res => {
            if(res.status === 0){
                if(res.data.rows.length > 0){
                    let arr = res.data.rows
                    arr.map(item => {
                        item.icon = 'iconqiyejibenxinxi'
                    })
                    if(arr.length > 0){
                        arr[arr.length - 1].icon = 'iconjiage'
                    }
                    this.setState({
                        settlementElectricityList : arr,
                        settlementElectricityIsNoData:false
                    })
                }else{
                    this.setState({
                        settlementElectricityList:res.data.rows,
                        settlementElectricityIsNoData:true
                    })
                }
            }
        })
    }
    //结算管理售电公司
    settlementElectricity = () => {
        return (
            <div className="settlement_manage">
                <div className="selection_date">
                    <p>选择日期<span onClick={() => this.setState({ settlementElectricityOpen: true })}>{this.state.settlementElectricityYear}</span></p>
                </div>
                {this.state.settlementElectricityList && this.state.settlementElectricityList.map((item, index) => {
                    return <div className="tab" key={index}>
                        <div className="item">
                            <div className="list">
                                <h3><i className={['iconfont ', item.icon].join('')}></i><span>{item.companyName}</span></h3>
                                <ul className="ul1">
                                    <li><p>结算电量：<span>{item.wholesaleBidPower}</span>千千瓦时</p></li>
                                    <li><p>结算电费：<span>{item.totalFee}</span>元</p></li>
                                    <li><p>偏差考核电费：<span>{item.assessFee}</span>元</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
                {this.state.settlementElectricityIsNoData && <div style={{background:'#fff'}}><NoData /></div>}
                <div className={this.state.settlementElectricityOpen ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ settlementElectricityOpen: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="month"
                            locale={enUs}
                            value={this.state.settlementElectricityTime}
                            onChange={this.settlementElectricityOnChange}
                        />
                        <div className="module-space"></div>
                        <div className="btns">
                            <Button className="btn" type="primary" onClick={() => this.setState({ settlementElectricityOpen: false })}>取消</Button>
                            <Button className="btn btn1" type="primary" onClick={this.getSettlementElectricityDate}>确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    getSettlementElectricityDate = () => {
        this.setState({
            settlementElectricityYear: this.state.settlementElectricityFullYear + '-' + this.state.settlementElectricityMonth,
            settlementElectricityOpen: false
        },() => {
            this.getSettlementElectricityData()
        })
    }
    settlementElectricityOnChange = (value) => {
        let fullYear = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        this.setState({
            settlementElectricityMonth: month,
            settlementElectricityFullYear: fullYear,
            settlementElectricityTime: value
        });
    };

    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='结算管理' back={true} search={false}></Header>
                <div className="chagen_tab">
                    <div className="change_tab_list">
                        <ul>
                            {this.state.tabs && this.state.tabs.map((item, index) => {
                                return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id })}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                </div>
                {this.state.active === '1' && this.wholesaleMarket()}
                {this.state.active === '2' && this.retailMarket()}
                {this.state.active === '3' && this.settlementElectricity()}
            </div>
        )
    }
}