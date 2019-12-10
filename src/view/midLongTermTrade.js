import React from 'react'
import TradingCenterList from './tradingCenterList'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1',
            tabs: [
                { id: '1', title: '交易公告信息' },
                { id: '2', title: '交易结果信息' }
            ],
            zcqTabs:[
                {id:'1', title:'2019年年度双边电力直接交易有约束结果发布', n1:'年度双边交易', n2:'', n3:'2019年1月10日', n4:'2019年1月15日'},
                {id:'2', title:'2019年年度双边电力直接交易有约束结果发布', n1:'年度双边交易', n2:'', n3:'2019年1月10日', n4:'2019年1月15日'},
                {id:'3', title:'2019年年度双边电力直接交易有约束结果发布', n1:'年度双边交易', n2:'', n3:'2019年1月10日', n4:'2019年1月15日'},
                {id:'4', title:'2019年年度双边电力直接交易有约束结果发布', n1:'年度双边交易', n2:'', n3:'2019年1月10日', n4:'2019年1月15日'},
            ]
        }
    }
    render() {
        return (
            <div className="midLongTermTrade">
                <div className="top">
                    <div className="chg_list">
                        <ul>
                            {this.state.tabs && this.state.tabs.map((item, index) => {
                                return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id })}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                </div>
                {this.state.active === '1' && <TradingCenterList zcqTabs={this.state.zcqTabs} />}
            </div>
        )
    }
}
