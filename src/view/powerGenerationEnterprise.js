import React from 'react'
import Header from '../components/header'
import ModuleTit from '../components/moduleTit';
import img1 from '../assets/img/img203.png';
import img3 from '../assets/img/img204.png';
import api from '../api/index';
import { getDataQuery } from '../utils/index';
import { baseImgUrl } from '../config/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            tabs: [
                { id: '1', title: '基本资料' },
                { id: '2', title: '机组成本' },
                { id: '3', title: '交易信息' }
            ],
            value: null,
            active: '1',
            id: `${getDataQuery('id')}`,
            participantId: `${getDataQuery('participantId')}`,
            isNotData: false,
        }
    }
    componentWillMount() {
        const that = this
    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
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
    //机组成本
    unitCost = () => {
        return (
            <div className="module-list">
                <ul>
                    <li className="item">
                        <span className="l">机组1</span>
                        <span className="r"><label>机组启动类型</label><label>启动时间</label></span>
                    </li>
                    <li className="item">
                        <span className="l">机组2</span>
                        <span className="r"><label>机组启动类型</label><label>启动时间</label></span>
                    </li>
                </ul>
            </div>
        )
    }
    //交易信息
    transactionInformation = () => {
        return (
            <div>
                <div className="transactioninfo">
                    <div className="l">
                        <h3>时间</h3>
                        <ul>
                            <li>2019-01</li>
                            <li>2019-02</li>
                            <li>2019-03</li>
                            <li>2019-04</li>
                            <li>2019-05</li>
                        </ul>
                    </div>
                    <div className="r">
                        <div style={{ overflowX: "auto" }}>
                            <div className="list">
                                <ul>
                                    <li>基数电量</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="list">
                                <ul>
                                    <li>省内电量</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="list">
                                <ul>
                                    <li>省外电量</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="list">
                                <ul>
                                    <li>议价期期望</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='发电企业' back={true} search={false}></Header>
                <div className="housenum">
                    <div className="power_user">
                        <h3>信息技术有限公司</h3>
                        <div className="list">
                            <ul>
                                <li><span>地址：</span>山西省太原市XXX区</li>
                                <li><span>联系人：</span>张三</li>
                                <li><span>联系手机：</span>13169779500</li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="module-space"></div>
                    <div className="cont">
                        <div className="chagen_tab">
                            <div className="change_tab_list">
                                <ul>
                                    {this.state.tabs && this.state.tabs.map((item, index) => {
                                        return <li className={item.id === this.state.active ? 'active' : ''} key={index} onClick={() => this.setState({ active: item.id })}>{item.title}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            {this.state.active === '1' && this.electricityGenerationDet()}
                            {this.state.active === '2' && this.unitCost()}
                            {this.state.active === '3' && this.transactionInformation()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}