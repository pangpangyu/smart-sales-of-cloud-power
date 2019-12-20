import React, { Fragment } from 'react';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img101.png';
import img2 from '../assets/img/img104.png';
// import { Picker } from 'antd-mobile';

/*
合同内容
*/

class ContractMes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            batteryList: [],
            contractId: 0,//合同id
            contractMesAll: [],//所有信息
            contractMes: [],//当前合同信息
            curCompanyId: 0,//当前企业id
            curCompanyMes: [],//当前企业信息
            curCompanyName: '',//当前企业名称,

            pickeroptions: [
                {
                    label: '电力直接协议1',
                    value: '1',
                },
                {
                    label: '电力直接协议2',
                    value: '2',
                },
                {
                    label: '电力直接协议3',
                    value: '3',
                },
                {
                    label: '电力直接协议4',
                    value: '4',
                },
                {
                    label: '电力直接协议5',
                    value: '5',
                },
            ]

        }
    }

    componentWillReceiveProps(nextProps) {
        const that = this;
        that.state.contractMesAll = nextProps.content;
        that.state.contractMes = nextProps.content.powerUserContract.contract;
        that.state.curCompanyId = that.state.contractMes.participant.id;
        that.state.curCompanyMes = nextProps.content.powerUsersOptions.filter(item => {
            return item.id == that.state.curCompanyId;
        })
        that.state.curCompanyName = that.state.curCompanyMes[0].text;
        that.state.batteryList = nextProps.content.taoCanVariableList;
        that.state.contractId = nextProps.contractId;
        //console.log('合同内容',that.state.contractMesAll)
        // console.log(nextProps.content.powerUsersOptions)
        // console.log(that.state.curCompanyId)
        // console.log(that.state.curCompanyMes)
        // console.log(that.state.curCompanyMes[0].text)
        //console.log(that.state.contractId)
    }


    render() {
        return (
            <Fragment>
                <div className="contract-mes">
                    <ModuleTit title="合同基本信息" imgurl={img1} >
                        {/* <Picker data={this.state.pickeroptions} onChange={this.handlePick} cols={1} className="forss">
                            <span className="moudle-tit-control">开发说明<i className="iconfont">&#xe822;</i></span>
                        </Picker> */}
                    </ModuleTit>
                    <div className="module-list">
                        <ul>
                            <li className="item">
                                <span className="l">合同名称:</span>
                                <span className="r">{this.state.contractMes.name}</span>
                            </li>
                            <li className="item">
                                <span className="l">企业名称:</span>
                                <span className="r">{this.state.curCompanyName}</span>
                            </li>
                            <li className="item">
                                <span className="l">购电总用量:</span>
                                <span className="r">{this.state.contractMes.contractPower}</span>
                            </li>
                            <li className="item">
                                <span className="l">合同套餐:</span>
                                <span className="r">{this.state.contractMesAll.taoCanName}</span>
                            </li>
                            <li className="item">
                                <span className="l">开始日期:</span>
                                <span className="r">{this.state.contractMes.startDate}</span>
                            </li>
                            <li className="item">
                                <span className="l">结束日期:</span>
                                <span className="r">{this.state.contractMes.endDate}</span>
                            </li>
                        </ul>
                        <div className="module-space"></div>
                        {/* 合同电量信息 */}
                        <ModuleTit title="合同条款关键信息" imgurl={img2} />
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
                                            <span className="amount">{item.value}</span>
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

    //
    handlePick=(val)=>{
        console.log(val)
    }
}

export default ContractMes;