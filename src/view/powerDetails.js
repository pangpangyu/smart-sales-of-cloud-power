import React, { Fragment } from 'react';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';

/*
合同内容
*/ 

class PowerDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <Fragment>
                <div className="contract-mes">
                    <ModuleTit title="基本信息" imgurl={img1} >            
                    </ModuleTit>
                    <div className="module-list">
                        <ul>
                            <li className="item">
                                <span className="l">企业全称</span>
                                <span className="r">信息技术有限公司</span>
                            </li>
                            <li className="item">
                                <span className="l">企业简称</span>
                                <span className="r">公司</span>
                            </li>
                            <li className="item">
                                <span className="l">曾用名</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">状态</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">入市日期</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">退市日期</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">地理区域</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">用电类别</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">企业所在地</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">交易类型</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">用户类型</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">联系电话</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">传真</span>
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
                                <span className="l">企业注册地址</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">法人代表</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">法人代表联系方式</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">统一社会信用代码</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">营业执照副本</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">开户许可证</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">委托授权书</span>
                                <span className="r"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PowerDetails;