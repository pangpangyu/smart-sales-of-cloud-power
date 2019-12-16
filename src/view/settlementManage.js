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
            WholesaleMarketListTotal:{},
            WholesaleMarketOpen: false,
            WholesaleMarketTime: new Date(),
            WholesaleMarketMonth: (new Date().getMonth() + 1),
            WholesaleMarketFullYear: new Date().getFullYear(),
            WholesaleMarketYear: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            retailMarketList: [
                {
                    id: 1,
                    title: '重点交易',
                    list: [
                        {
                            id: 1,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        },
                        {
                            id: 2,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        },
                        {
                            id: 3,
                            title: '山西xxx1公司',
                            icon: 'iconjiage',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        }
                    ]
                },
                {
                    id: 1,
                    title: '普通交易',
                    list: [
                        {
                            id: 1,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        }
                    ]
                },
                {
                    id: 1,
                    title: '重点2交易',
                    list: [
                        {
                            id: 1,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        },
                        {
                            id: 2,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        },
                        {
                            id: 3,
                            title: '山西xxx1公司',
                            icon: 'iconjiage',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        }
                    ]
                },
                {
                    id: 1,
                    title: '普通交易',
                    list: [
                        {
                            id: 1,
                            title: '山西xxx1公司',
                            icon: 'iconqiyejibenxinxi',
                            check: false,
                            n1: '1000',
                            n2: '20',
                            n3: '1000',
                            n4: '1000',
                            n5: '1000',
                            n6: '10'
                        }
                    ]
                }
            ],
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
            settlementElectricityOpen: false,
            settlementElectricityTime: new Date(),
            settlementElectricityMonth: (new Date().getMonth() + 1),
            settlementElectricityFullYear: new Date().getFullYear(),
            settlementElectricityYear: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
        }
    }
    componentWillMount() {
        const that = this
        that.getWholesaleMarket()
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
                    let arr2 = arr.pop()
                    this.setState({
                        WholesaleMarketList: arr,
                        WholesaleMarketListTotal:arr2
                    })
                }else{
                    this.setState({
                        WholesaleMarketList:res.data.rows,
                        WholesaleMarketListTotal:{}
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
                                <h3><i className='iconfont iconhezuowoshou'></i><span>{item.type}交易</span></h3>
                                <ul className={item.check ? 'active' : ''} onClick={() => this.WholesaleMarketChgCheck(index)}>
                                    <li><p>批发市场电费：<span>{item.settleFee}</span>元</p></li>
                                    <li><p>偏差考核电费：<span>{item.devAssFee}</span>元</p></li>
                                    <li><p>成交电量：<span>{item.contractPower}</span>千千瓦时</p></li>
                                    <li><p>结算电量：<span>{item.realPower}</span>千千瓦时</p></li>
                                    <li><p>成交均价：<span>{item.contractPrice}</span>千千瓦时</p></li>
                                    <li><p>偏差考核电量：<span>{item.devAssPower}</span>千千瓦时</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
                <div className="tab">
                        <div className="item">
                            <div className="list">
                                <h3><i className='iconfont iconjiage'></i><span>批发市场小计</span></h3>
                                <ul className='active'>
                                    <li><p>批发市场电费：<span>{this.state.WholesaleMarketListTotal.settleFee ? this.state.WholesaleMarketListTotal.settleFee : 0}</span>元</p></li>
                                    <li><p>偏差考核电费：<span>{this.state.WholesaleMarketListTotal.devAssFee ? this.state.WholesaleMarketListTotal.devAssFee : 0}</span>元</p></li>
                                    <li><p>成交电量：<span>{this.state.WholesaleMarketListTotal.contractPower ? this.state.WholesaleMarketListTotal.contractPower : 0}</span>千千瓦时</p></li>
                                    <li><p>结算电量：<span>{this.state.WholesaleMarketListTotal.realPower ? this.state.WholesaleMarketListTotal.realPower : 0}</span>千千瓦时</p></li>
                                    <li><p>成交均价：<span>{this.state.WholesaleMarketListTotal.contractPrice ? this.state.WholesaleMarketListTotal.contractPrice : 0}</span>千千瓦时</p></li>
                                    <li><p>偏差考核电量：<span>{this.state.WholesaleMarketListTotal.devAssPower ? this.state.WholesaleMarketListTotal.devAssPower : 0}</span>千千瓦时</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                                            <h3><i className={['iconfont ', v.icon].join('')}></i><span>{v.title}</span></h3>
                                            <ul className={v.check ? 'active' : ''} onClick={() => this.retailMarketChgCheck(index, k)}>
                                                <li><p>零售市场电费：<span>{v.n1}</span>元</p></li>
                                                <li><p>承担偏差电费：<span>{v.n2}</span>元</p></li>
                                                <li><p>电量计划：<span>{v.n3}</span>千千瓦时</p></li>
                                                <li><p>实际用电量：<span>{v.n4}</span>千千瓦时</p></li>
                                                <li><p>直接交易电量：<span>{v.n5}</span>千千瓦时</p></li>
                                                <li><p>协议电价：<span>{v.n6}</span>元/千千瓦时</p></li>
                                            </ul>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
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
        })
        this.GetContractList(1);
    }
    //零售市场获取日期并调用数据
    getRetailMarketDate = () => {
        this.setState({
            retailMarketYear: this.state.retailMarketFullYear + '-' + this.state.retailMarketMonth,
            retailMarketOpen: false
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

    //结算管理售电公司
    settlementElectricity = () => {
        return (
            <div className="settlement_manage">
                <div className="selection_date">
                    <p>选择日期<span onClick={() => this.setState({ settlementElectricityOpen: true })}>{this.state.settlementElectricityYear}</span></p>
                </div>
                {this.state.settlementElectricityList && this.state.settlementElectricityList.map((item, index) => {
                    return <div className="tab" key={item.id}>
                        <div className="item">
                            <div className="list">
                                <h3><i className={['iconfont ', item.icon].join('')}></i><span>{item.title}</span></h3>
                                <ul className="ul1">
                                    <li><p>结算电量：<span>{item.n1}</span>千千瓦时</p></li>
                                    <li><p>结算电费：<span>{item.n2}</span>元</p></li>
                                    <li><p>偏差考核电费：<span>{item.n3}</span>元</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
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