import React from 'react'
import Search from '../components/search';
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
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
            open: false,
            time: new Date(),
            month:'',
            fullYear:'',
            year: '2019-08',
        }
    }
    chgCheck(index, k) {
        let list = this.state.list;
        list[index].list[k].check = !list[index].list[k].check
        this.setState({
            list: list
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
    getDate = () => {
        this.setState({
            year: this.state.fullYear + '-' +this.state.month,
            open: false
        })
    }
    onChange = (value) => {
        let fullYear = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        this.setState({
            month: month,
            fullYear:fullYear,
            time:value
        });
    };
    render() {
        return (
            <div>
                <div className="settlement_manage">
                    <div className="selection_date">
        <p>选择日期<span onClick={() => this.setState({ open: true })}>{this.state.year}</span></p>
                    </div>
                    <div className="tab_box">
                        <Search title={'搜客户名称'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
                        {this.state.list && this.state.list.map((item, index) => {
                            return <div className="tab" key={index}>
                                <div className="tit">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="item">
                                    {item.list.map((v, k) => {
                                        return <div className="list" key={k}>
                                            <h3><i className={['iconfont ', v.icon].join('')}></i><span>{v.title}</span></h3>
                                            <ul className={v.check ? 'active' : ''} onClick={() => this.chgCheck(index, k)}>
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
                <div className={this.state.open ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="month"
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
}