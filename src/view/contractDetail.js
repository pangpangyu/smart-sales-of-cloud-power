import React, { Fragment } from 'react';
import ContractAttachment from './contractAttachment';
import ContractMes from './contractMes';
import { Tabs,View } from 'antd-mobile';


class ContractDetail extends React.Component {
    constructor(props) {
        super(props)
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
                 <Tabs 
                    tabs={this.state.tabs} 
                    swipeable="false"
                    tabBarActiveTextColor="#288dfd"                    
                >
                <View>
                    <ContractMes/>
                    
                </View>
                <View>
                    <ContractAttachment/>
                </View>
            </Tabs>
            </Fragment>
        )
    }
}

export default ContractDetail;