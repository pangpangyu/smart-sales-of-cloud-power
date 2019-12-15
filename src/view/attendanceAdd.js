import React from 'react';
import Header from '../components/header';
import { DatePickerView, Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
/**
 * 考勤管理 提交页面
 */

export default class AttendanceAdd extends React.Component {

  constructor(props) {
    super(props)
    let title = '请假';
    this.state = {
      title: title,
      dayopen: false,
      qjopen:false,
      time: null
    }

  }

  //请假弹框
  onChangeQJtype=()=>{

  }

  render() {
    return (
      <div>
        <Header title={this.state.title} back={true}></Header>
        <div className="attendnce-add">
          <div className="item">
            <div className="l">
              请假单号
              </div>
            <div className="r">
              <input value="12345" placeholder="请输入" />
            </div>
          </div>
          <div className="item">
            <div className="l">
              请假类型
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({ qjopen: true })}>请选择<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l black">
              开始时间
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({dayopen: true })}>请选择<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l black">
              结束时间
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({dayopen: true })}>请选择<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l">
              天数
              </div>
            <div className="r">
              <input value="" placeholder="请输入" />
            </div>
          </div>
          <div className="item">
            <div className="l">
              状态
              </div>
            <div className="r">
              <input value="" placeholder="请输入" />
            </div>
          </div>
          <div className="module-space"></div>
          <div className="other">
            <div className="tit">请假事由</div>
            <div>
              <textarea value="" placeholder="" className="area-wrap"></textarea>
            </div>
          </div>
        </div>
        {/* 时间选择 */}
        <div className={this.state.dayopen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ dayopen: false })}></div>
          <div className="pick_box">
            <DatePickerView
              mode="month"
              locale={enUs}
              value={this.state.time}
              onChange={this.onChange}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ dayopen: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={this.getDate}>确定</Button>
            </div>
          </div>
        </div>
        {/* 请假类型 */}
        <div className={this.state.qjopen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ qjopen: false })}></div>
          <div className="pick_box">
            <DatePickerView
              mode="month"
              locale={enUs}
              value={this.state.time}
              onChange={this.onChangeQJtype}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ qjopen: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={this.getDate}>确定</Button>
            </div>
          </div>
        </div>
        
        <div >
          <div className="footer-btn-group-space"></div>
          <div className="footer-btn-group">
            <div className="btn-group">
              <button>提交审核</button>
              <button className="btn-white">保存</button>
            </div>
          </div>
        </div>
      </div>
    )
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
}
