import React from 'react'
import Header from '../components/header'
import { getDataQuery } from '../utils/index'
import api from '../api'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        this.mediumAndLongTermResultDetData()
    }
    mediumAndLongTermResultDetData = () => {
        let params = `?rowNumber=0&pageSize=10`
        api.getResultDetail(params).then(res => {

        })
    }
    //中长期交易公告信息
    mediumAndLongTermTradeBulletinDet = () => {
        return (
            <div>
                <Header title='交易公告信息' back={true} search={false}></Header>
                <div className="tardingCenterDet">
                    <div className="contract-mes">
                        <div className="module-list">
                            <ul>
                                <li className="item">
                                    <span className="l">时间</span>
                                    <span className="r">2019年10月</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易名称</span>
                                    <span className="r">2019年xxx交易公告</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易品种</span>
                                    <span className="r">月度双边交易</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易主体</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">交易开始时间</span>
                                    <span className="r">2019年10月10日</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易结束时间</span>
                                    <span className="r">2019年10月10日</span>
                                </li>
                                <li className="item">
                                    <span className="l">交易规模</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">安全约束</span>
                                    <span className="r"></span>
                                </li>
                                <li className="item">
                                    <span className="l">附件 </span>
                                    <span className="r">xxx交易公告.pdf</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //中长期交易结果信息
    mediumAndLongTermResultDet = () => {
        return (
            <div>
                <Header title='交易公告信息' back={true} search={false}></Header>
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
    render() {
        return (
            <div>
                {getDataQuery('active') === '1' && this.mediumAndLongTermTradeBulletinDet()}
                {getDataQuery('active') === '2' && this.mediumAndLongTermResultDet()}
            </div>
        )
    }
}
