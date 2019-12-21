import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import { getDataQuery } from '../utils/index';
import api from '../api';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerList: [
                {
                    label: 'xxx交易单元',
                    value: 'xxx交易单元',
                },
                {
                    label: 'xxx交易单元2',
                    value: 'xxx交易单元2',
                },
            ],
            open: false,
            value: null,
            transactionUnit: '',
            transactionUnit: 'xxx交易单元',
            AnnualBilateral: 0, //年度双边
        }
    }
    componentWillMount() {
        this.powerTracingAnnualBilateral()
    }
    onScrollChange = (value) => {
        this.setState({
            value: value
        })
    }
    getDate = () => {
        const that = this
        this.setState({
            transactionUnit: this.state.value[0],
            open: false
        })
    }
    powerTracingAnnualBilateral = () => {
        let params = {
            rowNumber: 0,
            pageSize: 10,
            beginTime: '2019-12',
            companyName: '山西杏花村汾酒集团',
            userid: 0
        }
        api.powerTracingAnnualBilateral(params).then(res => {
            if (res.status === 0) {
                let num = res.data.rows.reduce(function (total, currentValue, currentIndex, arr) {
                    return total + parseInt(currentValue.adjPower);
                }, 0);
                this.setState({
                    AnnualBilateral:num
                })
            }
        })
    }
    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='电量跟踪详情' back={true} search={false}></Header>
                <div className="power_tracking_det">
                    <div className="top">
                        <h3>山西电力技术有限公司</h3>
                    </div>
                    <div className="cont">
                        <div className="contract-mes">
                            <div className="module-list">
                                <ul>
                                    <li className="item">
                                        <span className="l">公司名称</span>
                                        <span className="r">信息技术有限公司</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">交易月份</span>
                                        <span className="r">2019-09</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">交易电量</span>
                                        <span className="r">50000兆瓦时</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">年度双边电量</span>
                                        <span className="r">{this.state.AnnualBilateral ? this.state.AnnualBilateral:0}</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">合同转让电量</span>
                                        <span className="r">10000兆瓦时</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">现货申报电量</span>
                                        <span className="r">5000兆瓦时</span>
                                    </li>
                                    <li className="item">
                                        <span className="l">实际用电量累计</span>
                                        <span className="r"><Link to={`/actualPowerRecord`}>500兆瓦时</Link></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">累计天数</span>
                                        <span className="r"><Link to={`/SpotDeclarationDetMonth`}>5120兆瓦时（截止10日）</Link></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">剩余交易电量 </span>
                                        <span className="r"></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">剩余天数</span>
                                        <span className="r"></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">剩余天数预测电量</span>
                                        <span className="r"></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">预测偏差电量</span>
                                        <span className="r"></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">预测偏差率</span>
                                        <span className="r"></span>
                                    </li>
                                    <li className="item">
                                        <span className="l">预测等级</span>
                                        <span className="r"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
