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
                <Header title='现货申报明细（月）' back={true} search={false}></Header>
                <div className="spotDeclarationDetMonth">
                    <div className="top">
                        <h3>山西太原XX公司</h3>
                        <p>2019年11月的现货申报电量合计为 1230 兆瓦时（其中xxx交易单元 500兆瓦时，xxx交易单元 730 兆瓦时）</p>
                    </div>
                    <div className="chart_box">
        <div className="selection_date"><p>交易单元<span onClick={() => this.setState({ open: true })}>{this.state.transactionUnit}</span></p></div>
                        <div className="charts">
                            <h3>11月现货申报电量</h3>
                            <div className="chart">
                                <img src={require('../assets/img/img209.jpg')} />
                            </div>
                        </div>
                    </div>
                    <div className="detMonth_tab">
                        <h3>点击下方电量可查看明细（单位：兆瓦时）</h3>
                        <div className="list">
                            <ul>
                                <li><p>1日</p><h4>102</h4></li>
                                <li><p>2日</p><h4>102</h4></li>
                                <li><p>3日</p><h4>102</h4></li>
                                <li><p>14日</p><h4>102</h4></li>
                                <li><p>15日</p><h4>102</h4></li>
                                <li><p>16日</p><h4>102</h4></li>
                                <li><p>17日</p><h4>102</h4></li>
                                <li><p>25日</p><h4>102</h4></li>
                                <li><p>26日</p><h4>102</h4></li>
                                <li><p>27日</p><h4>102</h4></li>
                                <li><p></p><h4></h4></li>
                                <li><p></p><h4></h4></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={this.state.open ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
                    <div className="pick_box">
                        <PickerView
                            onChange={this.onChange}
                            onScrollChange={this.onScrollChange}
                            value={this.state.value}
                            data={this.state.pickerList}
                            cascade={false}
                        />
                        <div className="module-space"></div>
                        <div className="btns">
                            <Button className="btn" type="primary" onClick={() => this.setState({ open: false })}>取消</Button>
                            <Button className="btn btn1" type="primary" onClick={this.getDate}>确定</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
