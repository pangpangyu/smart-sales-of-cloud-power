import React from 'react'
import Header from '../components/header'
import { getDataQuery } from '../utils/index'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Header title='统调负荷信息' back={true} search={false}></Header>
                <div className="tardingCenterDet">
                    <div className="contract-mes">
                        <div className="module-list">
                            <ul>
                                <li className="item">
                                    <span className="l">交易时间</span>
                                    <span className="r">2019年10月10日</span>
                                </li>
                                <li className="item">
                                    <span className="l">参与市场主体数量</span>
                                    <span className="r">220家</span>
                                </li>
                                <li className="item">
                                    <span className="l">总申报电量</span>
                                    <span className="r">12000兆瓦时</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易方式</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">交易批次</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">成交市场主体数量</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">最终成交电量</span>
                                    <span className="r">10000兆瓦时</span>
                                </li>
                                <li className="item">
                                    <span className="l">成交均价</span>
                                    <span className="r">332元/兆瓦时</span>
                                </li>
                                <li className="item">
                                    <span className="l">最高成交价</span>
                                    <span className="r">338元/兆瓦时</span>
                                </li>
                                <li className="item">
                                    <span className="l">最低成交价</span>
                                    <span className="r">228元/兆瓦时</span>
                                </li>
                                <li className="item">
                                    <span className="l">附件</span>
                                    <span className="r">xxx交易公告.pdf</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
