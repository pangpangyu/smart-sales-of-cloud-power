import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import NoData from '../components/noData';

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
            ulact: false,
            list: [
                { id: 1, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', icon:'', check: false },
                { id: 2, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', check: false },
                { id: 3, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', check: false },
                { id: 4, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', check: false },
                { id: 5, title: '重点交易', n1: '1000', n2: '20', n3: '1000', n4: '1000', n5: '1000', n6: '1000', check: false }
            ]
        }
    }
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
                <div className="settlement_manage">
                    <div className="selection_date">
                        <p>选择日期<span>2019-08</span></p>
                    </div>
                    {this.state.list && this.state.list.map(item => {
                        return <div className="tab" key={item.id}>
                                    <div className="item">
                                        <div className="list">
                                            <h3><img src={require('../assets/img/img205.png')} /><span>{item.title}</span></h3>
                                            <ul className={this.state.ulact ? 'active' : ''} onClick={() => this.setState({ ulact: !this.state.ulact })}>
                                                <li><p>批发市场电费：<span>1000</span>元</p></li>
                                                <li><p>偏差考核电费：<span>20</span>元</p></li>
                                                <li><p>成交电量：<span>2000</span>千千瓦时</p></li>
                                                <li><p>结算电量：<span>2000</span>千千瓦时</p></li>
                                                <li><p>成交均价：<span>2000</span>千千瓦时</p></li>
                                                <li><p>偏差考核电量：<span>2000</span>千千瓦时</p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                    })}

                </div>
            </div>
        )
    }
}