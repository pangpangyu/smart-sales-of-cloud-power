import React from 'react'
import Header from '../components/header'

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render(){
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='现货申报明细（日）' back={true} search={false}></Header>
                <div className="spotDeclarationDetDay">
                    <div className="top">
                        <h3>山西太原XX公司</h3>
                        <p>xxx交易单元：2019年11月的现货申报电量合计为 1230 兆瓦时</p>
                    </div>
                    <div className="spot_declaration_power">
                        <h3>11月15日现货申报电量</h3>
                        <div className="chart">
                            <img src={require('../assets/img/img208.jpg')} />
                        </div>
                    </div>
                    <div className="spot_declaration_tab">
                        <h3>（单位：兆瓦时）</h3>
                        <div className="tab">
                            <div className="l">
                                <ul>
                                    <li>时段</li>
                                    <li>0-15</li>
                                    <li>15-30</li>
                                    <li>30-45</li>
                                    <li>45-60</li>
                                </ul>
                            </div>
                            <div className="r">
                                <div className="box">
                                    <div className="list">
                                        <ul>
                                            <li>00</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>01</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>02</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>03</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>04</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>05</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            <li>06</li>
                                            <li>284</li>
                                            <li>456</li>
                                            <li>456</li>
                                            <li>284</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
