import React from 'react';
import Header from '../components/header';

export default class NewDetaile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      detail:{
        title:'山西电力市场交易公告',
        time:'2018-08-08',
        txt:'在新的发展时期，公司将以深入学习实践科学发展观为契机，以建设“电网坚强，资产优良，服务优质，业绩优秀”现代公司为发展目标，弘扬“努力超越、追求卓越”的企业精神，继往开来，开拓创新，与时俱进，加快发展，为全省经济社会发展和全面建设小康社会继续做出应有的贡献。'
      }
    }
  }
  render(){
    return (
      <div style={{minHeight:'100vh',background:'#fff'}} className="company-new-detail">
        <Header title={'公司公告详情'} back={true} search={false}/>
        <div className="article-title">
          <h2>{ this.state.detail.title }</h2>
          <p>发布时间：{ this.state.detail.time }</p>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="txt">
          { this.state.detail.txt }
        </div>
      </div>
    )
  }
}
