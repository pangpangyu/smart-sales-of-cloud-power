import React from 'react'
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, title: '国网山西电力公司', n1: '1000', n2: '20', n3: '1000', icon:'iconqiyejibenxinxi' },
                { id: 2, title: '山西地方电力有限公司', n1: '1000', n2: '20', n3: '1000', icon:'iconqiyejibenxinxi' },
                { id: 3, title: '合计', n1: '1000', n2: '20', n3: '1000', icon:'iconjiage' }
            ],
            open: false,
            time: null,
            year: '2019-08',
        }
    }
    getDate = () => {
        const that = this
        this.setState({
            // year: this.state.time,
            open: false
        })
    }
    onChange = (value) => {
        console.log(value);
        this.setState({ 
            time: value
        });
      };
    render() {
        return (
                <div className="settlement_manage">
                    <div className="selection_date">
                        <p>选择日期<span onClick={() => this.setState({ open: true })}>2019-08</span></p>
                    </div>
                    {this.state.list && this.state.list.map((item,index) => {
                        return <div className="tab" key={item.id}>
                                    <div className="item">
                                        <div className="list">
                                            <h3><i className={['iconfont ',item.icon].join('')}></i><span>{item.title}</span></h3>
                                            <ul className="ul1">
                                                <li><p>结算电量：<span>{item.n1}</span>千千瓦时</p></li>
                                                <li><p>结算电费：<span>{item.n2}</span>元</p></li>
                                                <li><p>偏差考核电费：<span>{item.n3}</span>元</p></li>
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