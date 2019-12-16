import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img102.png';
import api from '../api/index';
import { Toast } from 'antd-mobile';

/*
附件信息
*/

class ContractAttachment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contractId: 0,//合同id
            contractMesAll: [],//所有信息
            contract: {},
        }
    }

    componentDidMount() {
        const that = this;
        document.documentElement.scrollTop = document.body.scrollTop = 0;

    }

    componentWillReceiveProps(nextProps) {
        const that = this;
        that.state.contractMesAll = nextProps.content;//接受从父组件传过来的接口数据
        that.state.contract = nextProps.content.powerUserContract.contract;
        console.log(that.state.contractMesAll)
    }
    toSee(e) {
        return () => {
            let url = ""
            switch (e) {
                case 1://合同扫描件
                    url = this.state.contract.contractAttachedFile ? this.state.contract.contractAttachedFile.url : ''
                    break;
                case 2://营业执照附件
                    url = this.state.contractMesAll.businessLicense ? (this.state.contractMesAll.businessLicense[0]&&this.state.contractMesAll.businessLicense[0].url)||'' : ''
                    break;
                case 3://甲方授权委托书
                    url = this.state.contract.contractAttachedFile3 ? this.state.contract.contractAttachedFile3.url : ''
                    break;
                case 4://乙方授权委托书
                    url = this.state.contract.contractAttachedFile4 ? this.state.contract.contractAttachedFile4.url : ''
                    break;
                case 5://开户许可证
                    url = this.state.contract.openPermit ? this.state.contract.openPermit.url : ''
                    break;
                case 6://其它附件
                    url = this.state.contractMesAll.contractFileMetas ? (this.state.contractMesAll.contractFileMetas[0]&&this.state.contractMesAll.contractFileMetas[0].url)||"" : ''
                    break;
                default:
                    break;
            }
            console.log(e, url)
            if(url){
                window.open(url);
            }else{
                Toast.info("暂无文件可查看");
            }
        }
    }

    render() {
        return (
            <Fragment>
                <div className="contract-attachment">
                    <ModuleTit title="合同附件" imgurl={img1} />
                    <ul className="contract-attachment-list" >
                        <li className="item">
                            <span className="l">合同扫描件</span>
                            <span className="m">{this.state.contract.contractAttachedFile ? this.state.contract.contractAttachedFile.name : '--'}</span>
                            <span className="r" onClick={this.toSee(1)}>点击查看</span>
                        </li>

                        <li className="item">
                            <span className="l">营业执照附件</span>
                            <span className="m">{this.state.contractMesAll.businessLicense ? (this.state.contractMesAll.businessLicense[0]&&this.state.contractMesAll.businessLicense[0].name)||'--' : '--'}</span>
                            <span className="r" onClick={this.toSee(2)}>点击查看</span>
                        </li>
                        <li className="item">
                            <span className="l">甲方授权委托书</span>
                            <span className="m">{this.state.contract.contractAttachedFile3 ? this.state.contract.contractAttachedFile3.name : '--'}</span>
                            <span className="r" onClick={this.toSee(3)}>点击查看</span>
                        </li>
                        <li className="item">
                            <span className="l">乙方授权委托书</span>
                            <span className="m">{this.state.contract.contractAttachedFile4 ? this.state.contract.contractAttachedFile4.name : '--'}</span>
                            <span className="r" onClick={this.toSee(4)}>点击查看</span>
                        </li>
                        <li className="item">
                            <span className="l">开户许可证</span>
                            <span className="m">{this.state.contract.openPermit ? this.state.contract.openPermit.name : '--'}</span>
                            <span className="r" onClick={this.toSee(5)}>点击查看</span>
                        </li>
                        <li className="item">
                            <span className="l">其它附件</span>
                            <span className="m">{this.state.contractMesAll.contractFileMetas ? (this.state.contractMesAll.contractFileMetas[0]&&this.state.contractMesAll.contractFileMetas[0].name)||'--' : '--'}</span>
                            <span className="r" onClick={this.toSee(6)}>点击查看</span>
                        </li>

                    </ul>

                </div>
            </Fragment>
        )
    }
}

export default ContractAttachment;