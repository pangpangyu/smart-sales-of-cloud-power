import React from 'react'
import Header from '../components/header'
import Search from '../components/search';
import { Link } from 'react-router-dom'
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            time: null,
            year: '2019-08',
            list: [
                { id: 1, title: '山西地方电力xxx1有限公司', n1: '一级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
                { id: 2, title: '山西地方电力xxx1有限公司', n1: '二级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
                { id: 3, title: '山西地方电力xxx1有限公司', n1: '三级预警', n2: '8000', n3: '5000', n4: '500', n5: '5' },
                { id: 4, title: '山西地方电力xxx1有限公司', n1: '良好', n2: '8000', n3: '5000', n4: '500', n5: '5' }
            ]
        }
    }
    handleSearchInput = e => {
        // console.log(e.target.value);
        this.setState({
            searchInput: e.target.value
        })
    }
    handleSearchSubmit = e => {
        //console.log(this.state.searchInput);
        this.setState({
            contractManageList: []
        })
        this.GetContractList(1);
    }
    getDate = () => {
        const that = this
        this.setState({
            // year: this.state.time,
            open: false
        })
    }
    onChange = (value) => {
        console.log(value);
        this.setState({
            time: value
        });
    };
    render() {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='电量跟踪' back={true} search={false}></Header>
                <div className="power_tracking">
                    <div className="top">
                        <Search title={'搜客户名称'} onInput={this.handleSearchInput} onSubmit={this.handleSearchSubmit} />
                        <div className="selection_date">
                            <p>选择日期<span onClick={() => this.setState({ open: true })}>{this.state.year}</span></p>
                        </div>
                    </div>
                    <div className="tab">
                        {this.state.list && this.state.list.map(item => {
                            return <div className="item" key={item.id}>
                                <Link to={`/powerTrackingDet`}>{this.state.txt}
                                    <h3>{item.title}</h3>
                                    <div className="list">
                                        <ul>
                                            <li><p>预警等级：<label className={(item.n1 === '一级预警' ? 'lb1' : '') + ' ' + (item.n1 === '二级预警' ? 'lb2' : '') + ' ' + (item.n1 === '三级预警' ? 'lb3' : '') + ' ' + (item.n1 === '良好' ? 'lb1' : '')}>{item.n1}</label></p></li>
                                            <li><p>交易电量：<span>{item.n2}</span>兆瓦时</p></li>
                                            <li><p>实际电量：<span>{item.n3}</span>兆瓦时</p></li>
                                            <li><p>预测偏差：<span>{item.n4}</span>兆瓦时</p></li>
                                            <li><p>偏差率：<span>{item.n5}%</span></p></li>
                                        </ul>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
                <div className={this.state.open ? 'modal on' : 'modal'}>
                    <div className="modal_bg" onClick={() => this.setState({ open: false })}></div>
                    <div className="pick_box">
                        <DatePickerView
                            mode="month"
                            locale={enUs}
                            value={this.state.time}
                            onChange={this.onChange}
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