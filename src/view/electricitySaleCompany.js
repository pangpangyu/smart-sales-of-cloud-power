import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import { baseImgUrl } from '../config/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            id: `${getDataQuery('id')}`,
            isNotData: false,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='售电公司' back={true} search={false}></Header>
                <div className="housenum">
                    <div className="cont">
                        <div>
                            <div className="contract-mes">
                                <ModuleTit title="基本信息" imgurl={img1} >
                                </ModuleTit>
                                <div className="module-list">
                                    <ul>
                                        <li className="item">
                                            <span className="l">公司名称</span>
                                            <span className="r">信息技术有限公司</span>
                                        </li>
                                        <li className="item">
                                            <span className="l">公司性质</span>
                                            <span className="r">公司</span>
                                        </li>
                                        <li className="item">
                                            <span className="l">所在区域</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">公司规模</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">售电能力</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">委托方式</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">公司背景</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">投资主体</span>
                                            <span className="r"></span>
                                        </li>
                                    </ul>
                                    <div className="module-space"></div>
                                    <ModuleTit title="注册信息" imgurl={img2} />
                                    <ul>
                                        <li className="item">
                                            <span className="l">法人名称</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">注册资金</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">法人营业执照注册号</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">企业注册地址</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">组织机构代码</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">开户银行</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">开户名称</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">开户账号</span>
                                            <span className="r"></span>
                                        </li>
                                        <li className="item">
                                            <span className="l">营业执照副本</span>
                                            <span className="r"></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}