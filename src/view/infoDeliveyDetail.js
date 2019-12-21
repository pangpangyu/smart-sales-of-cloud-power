import React from 'react'
import Header from '../components/header';
import api from '../api/index';
import { Modal,Toast } from 'antd-mobile';
// import { baseUrl } from '../config/index'

const alert = Modal.alert;
/**
 * 信息发布详情
 */
export default class InfoDeliveyDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      detail: {}
    }
  }

  componentDidMount() {
    this.getDetail()
  }
  getDetail = () => {
    const that = this
    let params = `?id=${this.state.id}`
    api.GetInfoPublishDataDetail(params).then(res => {
      if (res.status === 0) {
        that.setState({
          detail: res.data
        })
      }
    })
  }

  revokeRelease = () => {
    const that = this
    alert('撤销发布', '确定撤销发布?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          let params = `?id=${that.state.id}`
          api.CencalpublishSubmit(params).then(res => {
            if (res.status === 0) {
              that.getDetail()
            }
          })
        }
      },
    ])
  }

  gotoRelease = () => {
    alert('提交审核', '确定提交审核?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          //document.getElementById('infoForm').submit()
          let params = {
            ids: [parseInt(this.state.id)],
            status: 'publish'
          }
          api.CheckInfoPublishStatus(params).then(res => {
            if (res.state === 0) {

            }
          })
        }
      },
    ])
  }
  del = () => {
    alert('删除消息', '确定删除这条消息吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          let params = {
            ids: [this.state.id],
            status: 'delete'
          }
          api.CheckInfoPublishStatus(params).then(res => {

          }).then(res => {
            api.UpdateInfoPublishStatus(params).then(res => {
              if(res.status === 0){
                Toast.info(res.message, 2, () => { window.location.href='/infoDelivey' }, false);
              }
            })
          })
        }
      },
    ])
  }
  gotoEdit = () => {
    window.location.href = `/infoDeliveyAdd?id=${this.state.id}`
  }
  render() {
    return (
      <div className="infoDeliveyDetail" style={{ paddingBottom: '45px' }}>
        <Header title={'信息详情'} back={true} search={false} />
        <div className="infoDeliveyDetail-body">
          <div className="title">
            <p className="t" style={{ padding: '0 20px', lineHeight: '20px' }}>{this.state.detail.title}</p>
            <p className="time">发布时间：{this.state.detail.publishTime}</p>
          </div>
          <div style={{ height: '10px', background: '#f0f1f3' }}></div>
          <div className="txt" dangerouslySetInnerHTML={{ __html: this.state.detail.content }}></div>
          {/* <form id="infoForm" action={baseUrl + '/admin/system/checkInfoPublishStatus'} method="post" encType="multipart/form-data">
            <input type="hidden" name="ids" value="[78]" />
            <input type="hidden" name="status" value="publish" />
          </form> */}
        </div>
        {this.state.detail.status === 'PUBLISH' && <div className="btn"><div className="b" onClick={this.revokeRelease}>撤销发布</div></div>}
        {this.state.detail.status === 'CENCAL' && <div className="btn"><div className="b">已撤销发布</div><div className="b" onClick={ this.del }>删除</div></div>}
        {this.state.detail.status === 'DRAFT' && <div className="btn"><div className="b" onClick={this.gotoEdit}>编辑</div><div className="b" onClick={ this.del }>删除</div></div>}
        {this.state.detail.status === 'AUDITING' && <div className="btn"><div className="b">审核中</div></div>}
        
      </div>
    )
  }
}
