import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import NoData from '../components/noData'
import WholesaleMarket from './wholesaleMarket'
import RetailMarket from './retailMarket'
import SettlementElectricity from './settlementElectricity'

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
            ulact: false
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
                {this.state.active === '1' && <WholesaleMarket />}
                {this.state.active === '2' && <RetailMarket />}
                {this.state.active === '3' && <SettlementElectricity />}
            </div>
        )
    }
}