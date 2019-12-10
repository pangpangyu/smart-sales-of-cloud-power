import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {id:1,n1:'1230',date:'2019-11-10',n2:'无',n3:'XXX.jpg',n4:'张丹丹',n5:'2019-11-10 12:30'},
                {id:2,n1:'1230',date:'2019-11-10',n2:'无',n3:'XXX.jpg',n4:'张丹丹',n5:'2019-11-10 12:30'},
                {id:3,n1:'1230',date:'2019-11-10',n2:'无',n3:'XXX.jpg',n4:'张丹丹',n5:'2019-11-10 12:30'},
            ]
        }
    }
    render(){
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='实际用电量记录' back={true} search={false}></Header>
                <div className="actualpowerrecord">
                    <div className="top">
                        <h3>山西太原XX公司</h3>
                        <p>2019年11月的实际用电量最后统计为 1230 兆瓦时</p>
                    </div>
                    <div className="tab">
                        {this.state.list && this.state.list.map(item =>{
                            return <div className="item" key={item.id}>
                            <div className="tit">
                            <h3>实际用电量<font>{item.n1}</font>兆瓦时<span>截至日期 {item.date}</span></h3>
                            </div>
                            <div className="list">
                                <ul>
                                    <li><p><span>备注：</span>{item.n2}</p></li>
                                    <li><p><span>附件：</span><Link to={'#'}>{item.n3}</Link></p></li>
                                    <li><p><span>申报人：</span>{item.n4}</p></li>
                                    <li><p><span>申报时间：</span>{item.n5}</p></li>
                                </ul>
                            </div>
                        </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
