import React, { Fragment } from 'react';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img101.png';
import img2 from '../assets/img/img104.png';

/*
合同内容
*/ 

class ContractMes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            batteryList: [
                {
                    name: '委托交易电量',
                    amount: 50,
                },
                {
                    name: '委托交易电量',
                    amount: 50,
                },
                {
                    name: '委托交易电量',
                    amount: 50,
                },
            ]
        }
    }

    render() {
        return (
            <Fragment>
                <div className="contract-mes">
                    <ModuleTit title="合同基本信息" imgurl={img1} />
                    <div className="module-list">
                        <ul>
                            <li className="item">
                                <span className="l">合同名称:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                            <li className="item">
                                <span className="l">企业名称:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                            <li className="item">
                                <span className="l">购电总用量:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                            <li className="item">
                                <span className="l">合同套餐:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                            <li className="item">
                                <span className="l">开始日期:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                            <li className="item">
                                <span className="l">结束日期:</span>
                                <span className="r">01信息技术有限公司补充协议</span>
                            </li>
                        </ul>
                        <div className="module-space"></div>
                        <ModuleTit title="合同电量信息" imgurl={img2} />
                        <ul className="contract-battery-list">
                            <li className="item head">
                                <span className="num">序号</span>
                                <span className="info">条款名称</span>
                                <span className="amount">数量</span>
                            </li>
                            {
                                this.state.batteryList.map((item, index) => {
                                    return (
                                        <li className="item" key={index}>
                                            <span className="num">{index + 1}</span>
                                            <span className="info">{item.name}</span>
                                            <span className="amount">{item.amount}</span>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ContractMes;