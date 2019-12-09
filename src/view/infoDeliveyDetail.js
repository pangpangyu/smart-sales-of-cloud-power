import React from 'react'
import Header from '../components/header';
/**
 * 信息发布详情
 */
export default class InfoDeliveyDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      detail: {
        title:'山西电力市场交易公告',
        time:'2018-08-08',
        centent:'近日，从山西电网交易中心获悉，山西2018年市场化交易因政府相关部门未明确2018年电力市场交易政策暂时中止，1月份所有的电力市场用户按目录电价收费。'
      }
    }
  }
  render(){
    return(
      <div className="infoDeliveyDetail" style={{paddingBottom:'45px'}}>
        <Header title={'信息详情'} back={true} search={false}/>
        <div className="infoDeliveyDetail-body">
          <div className="title">
            <p className="t">{this.state.detail.title}</p>
            <p className="time">发布时间：{this.state.detail.time}</p>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="txt">
            { this.state.detail.centent }
          </div>
        </div>
        <div className="btn">撤销发布</div>
      </div>
    )
  }
}
