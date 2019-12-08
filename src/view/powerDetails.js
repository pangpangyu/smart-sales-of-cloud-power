import React, { Fragment } from 'react';
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img2 from '../assets/img/img104.png';
import img3 from '../assets/img/img204.png';
import NoData from '../components/noData';

/*
客户管理-详情
*/

class PowerDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    

    //电力用户详情
    powerUsersDet = () => {
        return (
            <div>
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
            </div>
        )
    }
    //发电公司详情
    electricityGenerationDet = () => {
        return (
            <div>
                <div className="contract-mes">
                    <ModuleTit title="基本信息" imgurl={img1} >
                    </ModuleTit>
                    <div className="module-list">
                        <ul>
                            <li className="item">
                                <span className="l">电厂名称</span>
                                <span className="r">信息技术有限公司</span>
                            </li>
                            <li className="item">
                                <span className="l">电厂简称</span>
                                <span className="r">公司</span>
                            </li>
                            <li className="item">
                                <span className="l">所属集团</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">企业性质</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">所属省级电网公司</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">所属地级电网公司</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">调度关系</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">状态</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">行政区域</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">股权结构</span>
                                <span className="r"></span>
                            </li>
                        </ul>
                        <div className="module-space"></div>
                        <ModuleTit title="联系信息" imgurl={img3} />
                        <ul>
                            <li className="item">
                                <span className="l">联系人</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">联系电话</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">手机</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">传真</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">详细地址</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">邮政编码</span>
                                <span className="r"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    //合作方详情
    partnersDet = () => {
        return (
            <div>
                <div className="contract-mes">
                    <ModuleTit title="基本信息" imgurl={img1} >
                    </ModuleTit>
                    <div className="module-list">
                        <ul>
                            <li className="item">
                                <span className="l">客户名称</span>
                                <span className="r">信息技术有限公司</span>
                            </li>
                            <li className="item">
                                <span className="l">企业性质</span>
                                <span className="r">公司</span>
                            </li>
                            <li className="item">
                                <span className="l">企业类型</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">行政区域</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">注册资本</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">电话</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">传真</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">邮政编码</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">企业所在地</span>
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
                                <span className="l">性别</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">证件类型</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">法人证件号码</span>
                                <span className="r"></span>
                            </li>
                            <li className="item">
                                <span className="l">工商行政管理局</span>
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
                                <span className="l">注册地址</span>
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
            </div>
        )
    }
    //售电公司详情
    sellingElectricityDet = () => {
        return (
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
        )
    }

    render() {
        return (
            <Fragment>
                {this.props.type === '1' && this.powerUsersDet()}
                {this.props.type === '2' && this.electricityGenerationDet()}
                {this.props.type === '3' && this.partnersDet()}
                {this.props.type === '4' && this.sellingElectricityDet()}
            </Fragment>
        )
    }
}

export default PowerDetails;