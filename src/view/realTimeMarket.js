import React from 'react'
import TradingCenterList from './tradingCenterList'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1',
            tabs: [
                { id: '1', title: '调频市场信息' },
                { id: '2', title: '省网直调负荷曲线' },
                { id: '3', title: '外送计划曲线' }
            ],
            FMMarket:[
                {id:'1', n1:'2019年10月12日', n2:'220.14元/兆瓦时', n3:'xxx公司  xxx电厂', n4:'228~332元/兆瓦时'},
                {id:'2', n1:'2019年10月12日', n2:'220.14元/兆瓦时', n3:'xxx公司  xxx电厂', n4:'228~332元/兆瓦时'},
                {id:'3', n1:'2019年10月12日', n2:'220.14元/兆瓦时', n3:'xxx公司  xxx电厂', n4:'228~332元/兆瓦时'},
            ],
            provincialNetwork:[
                {id:'1', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'2', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'3', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'4', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'5', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
            ],
            outwardDeliveryPlan:[
                {id:'1', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'2', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'3', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'4', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
                {id:'5', n1:'2019年10月10日', n2:'2200兆瓦', n3:'220兆瓦'},
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
                {this.state.active === '1' && <TradingCenterList type='3' active={this.state.active} FMMarket={this.state.FMMarket} />}
                {this.state.active === '2' && <TradingCenterList type='3' active={this.state.active} provincialNetwork={this.state.provincialNetwork} />}
                {this.state.active === '3' && <TradingCenterList type='3' active={this.state.active} outwardDeliveryPlan={this.state.outwardDeliveryPlan} />}
            </div>
        )
    }
}
