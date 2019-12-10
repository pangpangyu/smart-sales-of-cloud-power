import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'

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
            value: null,
            transactionUnit: '',
            transactionUnit: 'xxx交易单元'
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
                <Header title='交易中心公告' back={true} search={false}></Header>
            </div>
        )
    }
}
