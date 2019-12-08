import React, { Fragment } from 'react';
import Header from '../components/header';
import ContractAttachment from './contractAttachment';
import ContractMes from './contractMes';
import { Tabs,View } from 'antd-mobile';
import api from '../api/index';

class ContractDetail extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.match.params)
        this.state = {
            tabs:[
                { title: '合同内容' },
                { title: '附件信息' }
            ],
            contractId:this.props.match.params.id,

        }
    }

    componentDidMount() {
        const that = this;
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        that.GetContractDetail();

    }

    //售电合同详情
    GetContractDetail(){
        const that = this
        let params = {
            id:that.state.contractId,
            templId:0
        };
        api.GetContractDetail(params).then(res=>{
            console.log("售电合同详情"+res)

        })
    }
    

    render() {
        return (
            <Fragment>
                <Header title={'合同信息'} back={true} search={false}/>
                 <Tabs 
                    tabs={this.state.tabs} 
                    swipeable="false"
                    useOnPan="false"
                    tabBarActiveTextColor="#288dfd"                    
                >
                <View>
                    {/*  合同内容  */}
                    <ContractMes/>
                </View>
                <View>
                    {/*  附件信息  */}
                    <ContractAttachment/>
                </View>
            </Tabs>
            </Fragment>
        )
    }
}

export default ContractDetail;