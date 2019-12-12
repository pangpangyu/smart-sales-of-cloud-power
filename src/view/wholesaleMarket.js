import React from 'react'
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon: 'iconhezuowoshou', check: false },
                { id: 2, title: '普通交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon: 'iconhezuowoshou', check: false },
                { id: 3, title: '重点2交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon: 'iconhezuowoshou', check: false },
                { id: 4, title: '普通2交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon: 'iconhezuowoshou', check: false },
                { id: 5, title: '批发市场小计', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon: 'iconjiage', check: false }
            ],
            open: false,
            time: new Date(),
            month:'',
            fullYear:'',
            year: '2019-08',
        }
    }
    chgCheck(e) {
        let list = this.state.list;
        list[e].check = !list[e].check;
        this.setState({
            list: list
        })
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
            <div className="settlement_manage">
                <div className="selection_date">
        <p>选择日期<span onClick={() => this.setState({ open: true })}>{this.state.year}</span></p>
                </div>
                {this.state.list && this.state.list.map((item, index) => {
                    return <div className="tab" key={item.id}>
                        <div className="item">
                            <div className="list">
                                <h3><i className={['iconfont ', item.icon].join('')}></i><span>{item.title}</span></h3>
                                <ul className={item.check ? 'active' : ''} onClick={() => this.chgCheck(index)}>
                                    <li><p>批发市场电费：<span>{item.n1}</span>元</p></li>
                                    <li><p>偏差考核电费：<span>{item.n2}</span>元</p></li>
                                    <li><p>成交电量：<span>{item.n3}</span>千千瓦时</p></li>
                                    <li><p>结算电量：<span>{item.n4}</span>千千瓦时</p></li>
                                    <li><p>成交均价：<span>{item.n5}</span>千千瓦时</p></li>
                                    <li><p>偏差考核电量：<span>{item.n6}</span>千千瓦时</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                })}
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