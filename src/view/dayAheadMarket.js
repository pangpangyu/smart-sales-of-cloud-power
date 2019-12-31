import React from 'react'
import TradingCenterList from './tradingCenterList'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '1',
            tabs: [
                { id: '1', title: '统调负荷信息' },
                { id: '2', title: '备用信息' },
                { id: '3', title: '输变电检修信息' },
                { id: '4', title: '阻塞' },
                { id: '5', title: '必开必停信息' }
            ],
            unifiedLoadRegulation:[
                {id:'1', n1:'2019年10月10日', n2:'333.33兆瓦', n3:'100兆瓦'},
                {id:'2', n1:'2019年10月10日', n2:'333.33兆瓦', n3:'100兆瓦'},
                {id:'3', n1:'2019年10月10日', n2:'333.33兆瓦', n3:'100兆瓦'},
                {id:'4', n1:'2019年10月10日', n2:'333.33兆瓦', n3:'100兆瓦'},
            ],
            backupInfo:[
                {id:'1', n1:'正备用', n2:'333.33兆瓦', n3:'2019年10月12日'},
                {id:'2', n1:'正备用', n2:'333.33兆瓦', n3:'2019年10月12日'},
                {id:'3', n1:'正备用', n2:'333.33兆瓦', n3:'2019年10月12日'},
                {id:'4', n1:'正备用', n2:'333.33兆瓦', n3:'2019年10月12日'},
            ],
            maintenanceInfo:[
                {id:'1', n1:'xxxx', n2:'220KV', n3:'2019年10月12日'},
                {id:'2', n1:'xxxx', n2:'220KV', n3:'2019年10月12日'},
                {id:'3', n1:'xxxx', n2:'220KV', n3:'2019年10月12日'},
                {id:'4', n1:'xxxx', n2:'220KV', n3:'2019年10月12日'},
            ],
            block:[
                {id:'1', title:'2019年10月12日xxx线路阻塞', n1:'638兆瓦', n2:'300兆瓦', n3:'年度'},
                {id:'2', title:'2019年10月12日xxx线路阻塞', n1:'638兆瓦', n2:'300兆瓦', n3:'年度'},
                {id:'3', title:'2019年10月12日xxx线路阻塞', n1:'638兆瓦', n2:'300兆瓦', n3:'年度'},
                {id:'4', title:'2019年10月12日xxx线路阻塞', n1:'638兆瓦', n2:'300兆瓦', n3:'年度'},
            ]
        }
    }
    componentDidMount(){
        if(window.sessionStorage.getItem('active2')){
            this.setState({
                active:window.sessionStorage.getItem('active2')
            })
        }
    }
    render() {
        return (
            <div className="midLongTermTrade">
                <div className="top">
                    <div className="chg_list">
                        <ul>
                            {this.state.tabs && this.state.tabs.map((item, index) => {
                                return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => {this.setState({ active: item.id });window.sessionStorage.setItem('active2',item.id)}}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                </div>
                {this.state.active === '1' && <TradingCenterList type='2' active={this.state.active} unifiedLoadRegulation={this.props.tradeUnifiedList} />}
                {this.state.active === '2' && <TradingCenterList type='2' active={this.state.active} backupInfo={this.props.backupList} />}
                {this.state.active === '3' && <TradingCenterList type='2' active={this.state.active} maintenanceInfo={this.props.substationList} />}
                {this.state.active === '4' && <TradingCenterList type='2' active={this.state.active} block={this.props.blackList} />}
                {this.state.active === '5' && <TradingCenterList type='2' active={this.state.active} startStopInfo={this.props.startStopInfo} />}
            </div>
        )
    }
}
