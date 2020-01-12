import React from 'react';
import Header from '../components/header';
import api from '../api/index';
import { baseImgUrl } from '../config/index';
/**
 * 公司公告详情
 * 消息提醒详情
 */
export default class NewDetaile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      type: this.props.match.params.type,
      id: this.props.match.params.id,
      detail:{}
    }
  }

  componentDidMount(){
    if(this.state.type === '1'){
      this.getNoticeDetaile()
    }
  }

  getNoticeDetaile = () => {
    const that = this
    let params = `?id=${that.state.id}&groupId=-1`
    api.GetCompanyNoticeDetail(params).then(res => {
      that.setState({
        detail:res
      })
    })
  }

  render(){
    return (
      <div style={{minHeight:'100vh',background:'#fff'}} className="company-new-detail">
        <Header title={'公司公告详情'} back={true} search={false}/>
        <div className="article-title">
          <h2>{ this.state.detail.title }</h2>
          <p>发布时间：{ this.state.detail.createTime }</p>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        { this.state.detail.fileMetalist && this.state.detail.fileMetalist.length > 0 && 
          this.state.detail.fileMetalist.map((item,index) => {
            return  <div key={index} style={{padding:'15px'}}>
                      <img src={ baseImgUrl + item.url } alt={item.fileName} style={{maxWidth:'100%'}}/>
                    </div>  
          })
        }
        <div className="txt" dangerouslySetInnerHTML={{__html:this.state.detail.content}}>
          {/* { this.state.detail.content } */}
        </div>
      </div>
    )
  }
}
