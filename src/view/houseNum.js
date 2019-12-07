import React from 'react'
import Header from '../components/header'
import ContractAttachment from './contractAttachment';
import AccountManagement from './accountManagement';
import AnnualEstimatedPower from './annualEstimatedPower';
import PowerDetails from './powerDetails';
import { Tabs, View } from 'antd-mobile';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        let title = '公司信息'
        let search = false
        let tabs = [
            { title: '基本信息' },
            { title: '户号信息' },
            { title: '账号管理' },
            { title: '年预计电量' }
        ]
        if (this.props.match.params.type === '1') {
            //电力用户信息
            title = '电力用户'
        } else if (this.props.match.params.type === '2') {
            //发电厂信息
            title = '发电企业'
            tabs = [
                { title: '基本资料' },
                { title: '机组成本' },
                { title: '交易信息' }
            ]
        } else if (this.props.match.params.type === '3') {
            //合作方信息
            title = '合作方'
            tabs = [
                { title: '基本信息' },
                { title: '账号管理' }
            ]
        } else if (this.props.match.params.type === '4') {
            //售电公司信息
            title = '售电公司'
            tabs = []
        }
        this.state = {
            tabs: tabs,
            title: title,
            userList:[
                { id:1, name:'张三', c:true, email:'Test01@163.com', tel:'13546789898', account:'XXZHANGSAN', birthday:'12月31日' },
                { id:2, name:'李四', c:false, email:'Test01@163.com', tel:'13546789898', account:'XXZHANGSAN', birthday:'12月31日' }
            ]
        }
    }
    componentDidMount(){
        document.documentElement.scrollTop = document.body.scrollTop =0;
    }
    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title={this.state.title} back={true} search={false}></Header>
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
                        <Tabs
                            tabs={this.state.tabs}
                            swipeable="false"
                            useOnPan="false"
                            tabBarActiveTextColor="#288dfd"
                        >
                            <View>
                                {/*  合同内容  */}
                                <PowerDetails />
                            </View>
                            <View>
                                {/*  附件信息  */}
                                <ContractAttachment />
                            </View>
                            <View>
                                {/*  账户管理  */}
                                <AccountManagement userList={this.state.userList}/>
                            </View>
                            <View>
                                {/*  年预计电量  */}
                                <AnnualEstimatedPower />
                            </View>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}