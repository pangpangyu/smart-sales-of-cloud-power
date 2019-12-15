import React from 'react'
import Header from '../components/header';
import api from '../api/index';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;
/**
 * 信息发布详情
 */
export default class InfoDeliveyDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id:this.props.match.params.id,
      detail: { }
    }
  }
  
  componentDidMount(){
    this.getDetail()
  }
  getDetail = () => {
    const that = this
    let params = `?id=${this.state.id}`
    api.GetInfoPublishDataDetail(params).then(res => {
      if(res.status === 0){
        that.setState({
          detail: res.data
        })
      }
    })
  }

  revokeRelease = () => {
    const that = this
    alert('撤销发布', '确定撤销发布???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        let params = `?id=${that.state.id}`
        api.CencalpublishSubmit(params).then(res => {
          if(res.state === 0){
            that.getDetail()
          }
        })
      }},
    ])
  }

  render(){
    return(
      <div className="infoDeliveyDetail" style={{paddingBottom:'45px'}}>
        <Header title={'信息详情'} back={true} search={false}/>
        <div className="infoDeliveyDetail-body">
          <div className="title">
            <p className="t" style={{padding:'0 20px',lineHeight:'20px'}}>{this.state.detail.title}</p>
            <p className="time">发布时间：{this.state.detail.publishTime}</p>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="txt" dangerouslySetInnerHTML = {{ __html: this.state.detail.content }}></div>
        </div>
        { this.state.detail.status === 'PUBLISH' && <div className="btn" onClick={this.revokeRelease}>撤销发布</div> }
        { this.state.detail.status === 'CENCAL' && <div className="btn">已撤销发布</div> }
        { this.state.detail.status === 'DRAFT' && <div className="btn">草稿</div> }
      </div>
    )
  }
}
