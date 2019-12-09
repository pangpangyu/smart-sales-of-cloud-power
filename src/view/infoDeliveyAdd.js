import React from 'react';
import Header from '../components/header';
import { PickerView, ImagePicker } from 'antd-mobile';
/**
 * 信息发布-添加信息
 */
export default class InfoDeliveyAdd extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      season: [
        { label: '春', value: '春' },
        { label: '夏', value: '夏' }
      ],
      value:null,
      openModel:false,
      fileName:'请选择',
      fileName2:'请选择',
      multiple: false,
    }
  }

  onChangeFile = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  onChange = (value) => {
    console.log(value)
    this.setState({
      value,
    });
  }

  render(){
    return(
      <div style={{minHeight:'100vh',background:'#fff',paddingBottom:'45px'}}>
        <Header title={'添加信息'} back={true} search={false}/>
        <div className="infoDeliveyAdd">
          <div className="view">
            <div className="item">
              <div className="l">标题</div>
              <div className="r"><input type="text" placeholder="请输入"/></div>
            </div>
            <div className="item bgImg">
              <div className="l">发布位置</div>
              <div className="r" onClick={ () => { this.setState({openModel:!this.state.openModel}) } }>公司公告</div>
            </div>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="view">
            <div className="item2">
              <div className="l">介绍</div>
              <div className="r">
                <textarea placeholder="超过200个字请到管理后台编辑"></textarea>
              </div>
            </div>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="view">
            <div className="item2">
              <div className="l">内容</div>
              <div className="r">
                <textarea placeholder="超过200个字请到管理后台编辑"></textarea>
              </div>
            </div>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="view">
            <div className="item">
              <div className="l">来源</div>
              <div className="r"><input type="text" placeholder="请输入"/></div>
            </div>
            <div className="item bgImg">
              <div className="l">图片</div>
              <div className="r cl2">
                {/* <ImagePicker
                  files={this.state.files}
                  onChange={this.onChangeFile}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={this.state.files.length < 7}
                  multiple={this.state.multiple}
                /> */}
                <input type="file" className="file"/>
                { this.state.fileName }
              </div>
            </div>
            <div className="item bgImg">
              <div className="l">附件</div>
              <div className="r cl2">
                <input type="file" className="file"/>
                { this.state.fileName2 }
              </div>
            </div>
          </div>
          <div style={{height:'10px',background:'#f0f1f3'}}></div>
          <div className="submit-btn">
            <button className="tj">提交审核</button>
            <button>保存</button>
          </div>
        </div>
        <div className={this.state.openModel ? 'infoDelivey-model on':'infoDelivey-model'}>
          <div className="mode-view-mb" onClick={ (e) => { this.setState({openModel:!this.state.openModel}) } }></div>
          <div className="mode-view">
            <PickerView
              data={this.state.season}
              cascade={false}
              style={{height:'50px'}}
              onChange={this.onChange}
              value={this.state.value}
            />
            <div style={{height:'8px',background:'#f0f1f3'}}></div>
            <div className="btn">
              <button onClick={ (e) => { this.setState({openModel:!this.state.openModel}) } }>取消</button>
              <button className="ok">确定</button>
            </div>
            <div style={{height:'8px',background:'#f0f1f3'}}></div>
            <div style={{height:'20px',background:'#fff'}}></div>
          </div>
        </div>
      </div>
    )
  }
}
