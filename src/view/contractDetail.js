import React, { Fragment } from 'react';
import Header from '../components/header';
import ContractAttachment from './contractAttachment';
import ContractMes from './contractMes';
import { Tabs,View } from 'antd-mobile';


class ContractDetail extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.match.params)
        this.state = {
            tabs:[
                { title: '合同内容' },
                { title: '附件信息' }
            ]
        }
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