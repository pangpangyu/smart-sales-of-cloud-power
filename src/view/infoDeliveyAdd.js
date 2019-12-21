import React from 'react';
import Header from '../components/header';
import { PickerView, Toast } from 'antd-mobile';
import api from '../api';
import { getDataQuery } from '../utils/index'
import { baseUrl } from '../config/index'
/**
 * 信息发布-添加信息
 */
export default class InfoDeliveyAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: null,
      openModel: false,
      file1: {},
      file2: {},
      multiple: false,
      title: '',//标题
      source: '',//来源
      introduction: '',//介绍
      content: '',//内容
      txt: '',
      id: getDataQuery('id') || 0
    }
  }

  componentWillMount(){
    this.getInfoPublishDataDetail()
  }

  getInfoPublishDataDetail = () => {
    const that = this
    console.log(this.state.id)
    let params = `?id=${this.state.id === 0 ? '' : this.state.id}`
    api.GetInfoPublishDataDetail(params).then(res => {
      if (res.status === 0) {
        let arr = []
        res.data.options.map(item => {
          arr.push({ label: item.text, value: item.value })
        })
        that.setState({
          options: arr
        })
        that.setState({
          options: arr,
          title: res.data.title || '',
          content: res.data.content || '',
          introduction: res.data.introduction || '',
          source: res.data.newsResource || '',
          value: [res.data.publishLocation],
          file2: res.data.attachments.length > 0 ? res.data.attachments[0] : {},
          file1: res.data.displayImage.length > 0 ? res.data.displayImage[0] : {},
          txt: res.data.publishLocation ? res.data.options.filter(v => v.value === res.data.publishLocation)[0].text : ''
        })
      }
    })
  }

  onChange = (value) => {
    console.log(value[0])
    let txt = this.state.options.filter(v => v.value === value[0])[0].label
    this.setState({
      value,
      txt: txt
    });
  }

  setSaveEdit = () => {
    const that = this
    if (!that.state.title) {
      Toast.info('请填写标题', 2, null, false);
      return
    }
    if (!that.state.value) {
      Toast.info('请选择发布位置', 2, null, false);
      return
    }
    let params = {
      title: this.state.title,
      publishLocation: {
        id: that.state.value[0]
      },
      content: this.state.content,
      newsResource: this.state.source,
      introduction: this.state.introduction
    }
    if (that.state.file1.id) {
      params.displayImage = {
        id: that.state.file1.id
      }
    }
    if (that.state.file2.id) {
      params.attachments = {
        id: [that.state.file2.id]
      }
    }
    api.SetSaveEdit(params).then(res => {
      if (res.status === 0) {
        Toast.info(res.message, 2, () => { window.history.go(-1) }, false);
      }
    })
  }

  handelChange1 = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handelChange2 = (e) => {
    this.setState({
      source: e.target.value
    })
  }

  handelChange3 = (e) => {
    this.setState({
      introduction: e.target.value
    })
  }

  handelChange4 = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handelChange5 = (e) => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file)
    api.UploadFile(formData).then(res => {
      this.setState({
        file1: res.data
      })
    })
  }

  handelChange6 = (e) => {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file)
    api.UploadFile(formData).then(res => {
      this.setState({
        file2: res.data
      })
    })
  }

  savePickerView = () => {
    this.setState({
      openModel: !this.state.openModel
    })
  }

  saveAndSubmit = () => {
    const that = this
    if (!that.state.title) {
      Toast.info('请填写标题', 2, null, false);
      return
    }
    if (!that.state.value) {
      Toast.info('请选择发布位置', 2, null, false);
      return
    }
    let params = {
      title: this.state.title,
      publishLocation: {
        id: that.state.value[0]
      },
      content: this.state.content,
      newsResource: this.state.source,
      introduction: this.state.introduction
    }
    if (that.state.file1.id) {
      params.displayImage = {
        id: that.state.file1.id
      }
    }
    if (that.state.file2.id) {
      params.attachments = {
        id: [that.state.file2.id]
      }
    }
    api.saveAndSubmit(params).then(res => {
      if (res.status === 0) {
        Toast.info(res.message, 2, () => { window.location.href='/infoDelivey' }, false);
        // window.history.go(-1)
      }
    })
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: '45px' }}>
        <Header title={'添加信息'} back={true} search={false} />
        <div className="infoDeliveyAdd">
          <div className="view">
            <div className="item">
              <div className="l">标题</div>
              <div className="r"><input type="text" value={this.state.title} onChange={this.handelChange1} placeholder="请输入" /></div>
            </div>
            <div className="item bgImg">
              <div className="l">发布位置</div>
              <div className="r" onClick={() => { this.setState({ openModel: !this.state.openModel }) }}>{this.state.txt}</div>
            </div>
          </div>
          <div style={{ height: '10px', background: '#f0f1f3' }}></div>
          <div className="view">
            <div className="item2">
              <div className="l">介绍</div>
              <div className="r">
                <textarea onChange={this.handelChange3} value={this.state.introduction} placeholder="超过200个字请到管理后台编辑"></textarea>
              </div>
            </div>
          </div>
          <div style={{ height: '10px', background: '#f0f1f3' }}></div>
          <div className="view">
            <div className="item2">
              <div className="l">内容</div>
              <div className="r">
                <textarea onChange={this.handelChange4} value={this.state.content} placeholder="超过200个字请到管理后台编辑"></textarea>
              </div>
            </div>
          </div>
          <div style={{ height: '10px', background: '#f0f1f3' }}></div>
          <div className="view">
            <div className="item">
              <div className="l">来源</div>
              <div className="r"><input type="text" value={this.state.source} onChange={this.handelChange2} placeholder="请输入" /></div>
            </div>
            <div className="item bgImg">
              <div className="l">图片</div>
              <div className="r cl2">
                <input type="file" id="file1" onChange={this.handelChange5} className="file" />
                {this.state.file1.name || '请选择'}
              </div>
            </div>
            <div className="item bgImg">
              <div className="l">附件</div>
              <div className="r cl2">
                <input type="file" id="file2" onChange={this.handelChange6} className="file" />
                {this.state.file2.name || '请选择'}
              </div>
            </div>
          </div>
          <div style={{ height: '10px', background: '#f0f1f3' }}></div>
          <div className="submit-btn">
            <button className="tj" onClick={this.saveAndSubmit}>提交审核</button>
            <button onClick={this.setSaveEdit}>保存</button>
          </div>
        </div>
        <form id="subForm" action={baseUrl+'/admin/system/checkInfoPublishStatus'} method="post" target="frameName">
          <input type="hidden" name="ids[]" value="109" />
          <input type="hidden" name="status" value="publish" />
        </form>
        <div className={this.state.openModel ? 'infoDelivey-model on' : 'infoDelivey-model'}>
          <div className="mode-view-mb" onClick={(e) => { this.setState({ openModel: !this.state.openModel }) }}></div>
          <div className="mode-view">
            <PickerView
              data={this.state.options}
              cascade={false}
              style={{ height: '50px' }}
              onChange={this.onChange}
              value={this.state.value}
            />
            <div style={{ height: '8px', background: '#f0f1f3' }}></div>
            <div className="btn">
              <button onClick={(e) => { this.setState({ openModel: !this.state.openModel }) }}>取消</button>
              <button className="ok" onClick={this.savePickerView}>确定</button>
            </div>
            <div style={{ height: '8px', background: '#f0f1f3' }}></div>
            <div style={{ height: '20px', background: '#fff' }}></div>
          </div>
        </div>
      </div>
    )
  }
}
