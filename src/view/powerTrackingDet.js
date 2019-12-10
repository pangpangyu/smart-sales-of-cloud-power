import React from 'react'
import Header from '../components/header'
import { PickerView, Button } from 'antd-mobile';
import Item from 'antd-mobile/lib/popover/Item';
import { runInThisContext } from 'vm';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerList: [
                {
                    label: 'xxx交易单元',
                    value: 'xxx交易单元',
                },
                {
                    label: 'xxx交易单元2',
                    value: 'xxx交易单元2',
                },
            ],
            open: false,
            value:null,
            transactionUnit:'',
            transactionUnit:'xxx交易单元'
        }
    }
    onScrollChange = (value) => {
        this.setState({
          value: value
        })
      }
      getDate = () => {
        const that = this
        this.setState({
            transactionUnit: this.state.value[0],
          open: false
        })
      }
    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='电量跟踪详情' back={true} search={false}></Header>
                <div className="spotDeclarationDetMonth">
                    <div className="top">
                        <h3>山西电力技术有限公司</h3>
                    </div>
                </div>
            </div>
        )
    }
}
