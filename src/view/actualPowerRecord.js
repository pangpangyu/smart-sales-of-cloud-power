import React from 'react'
import Header from '../components/header'
import Search from '../components/search';
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            time: null,
            year: '2019-08',
            list:[
                {id:1,title:'山西地方电力xxx1有限公司',n1:'一级预警',n2:'8000',n3:'5000',n4:'500',n5:'5'},
                {id:2,title:'山西地方电力xxx1有限公司',n1:'二级预警',n2:'8000',n3:'5000',n4:'500',n5:'5'},
                {id:3,title:'山西地方电力xxx1有限公司',n1:'三级预警',n2:'8000',n3:'5000',n4:'500',n5:'5'},
                {id:4,title:'山西地方电力xxx1有限公司',n1:'良好',n2:'8000',n3:'5000',n4:'500',n5:'5'}
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
    render(){
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='电量跟踪' back={true} search={false}></Header>
                <div className="actualpowerrecord">
                    <div className="top">
                        <h3>山西太原XX公司</h3>
                        <p>2019年11月的实际用电量最后统计为 1230 兆瓦时</p>
                    </div>
                    <div className="tab">
                        
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