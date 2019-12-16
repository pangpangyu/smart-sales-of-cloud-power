import React from 'react';
import Header from '../components/header';
import { DatePickerView, PickerView, Button, Toast } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import api from '../api/index';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
  if (!date) { return }
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

function getListItem(list, key, value) {
  return list.filter(item => {
    return item[key] === value;
  })
}
/**
 * 考勤管理 提交页面
 */

export default class AttendanceAdd extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.match.params)
    let title = '请假';
    this.state = {
      leaveId:this.props.match.params.id,//
      leaveTypeParams:this.props.match.params.leaveType,
      status:this.props.match.params.status,
      title: title,
      dayopen: false,
      dayopen2: false,
      qjopen: false,
      time: now,

      startDateTime: now,
      endDateTime: now,
      leaveType: "",
      leaveTypeLabel: "",

      leaveTypeOptions: [],//请假类型
      isLock:false,



      form: {
        departmentName: "",
        positionName: "",
        systemUserName: "",
        startTime: null,
        endTime: null,
        containDays: "",
        containHours: "",
        leaveReason: "",
        type: "",

        qjNum:"",
        status:""
      }
    }

  }

  //请假类型选择
  onChangeQJtype = (val) => {
    console.log(val[0]);
    this.setState({
      leaveType: val
    })
  }

  getType = () => {
    var typeVal = (this.state.leaveType && this.state.leaveType[0]) || "0"
    console.log(typeVal);
    this.setState({
      qjopen: false,
      leaveTypeLabel: getListItem(this.state.leaveTypeOptions, 'value', typeVal || "0")[0].label,
      form: Object.assign({}, this.state.form, { type: typeVal })
    });
  }

  getDate = (type) => {
    const that = this
    if (type == "start") {
      this.setState({
        dayopen: false,
        form: Object.assign({}, this.state.form, { startTime: formatDate(this.state.startDateTime || now) })
      })
    } else {
      this.setState({
        dayopen2: false,
        form: Object.assign({}, this.state.form, { endTime: formatDate(this.state.endDateTime || now) })
      })
    }

  }


  onChange = (value) => {
    console.log(value);
    this.setState({
      time: value
    });
  };

  componentWillMount() {
    const that = this;
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    that.GetleaveTypeOptions();//获取请假类型
    that.GetDefaultPersonalInfo();//获取考勤部门信息
  }


  //获取请假类型
  GetleaveTypeOptions = () => {
    const that = this;
    let params = {}
    api.GetleaveTypeOptions(params).then(res => {
      console.log('请假类型:', res);
      let rawData = res.data || [];
      let options = rawData.map((option) => {
        return { label: option.text, value: option.value }
      })
      if (res.status === 0) {
        that.setState({
          leaveTypeOptions: options
        })
      }

    })
  }

  //获取考勤部门信息
  GetDefaultPersonalInfo=()=>{
    const that=this;
    let params={
      id:that.state.leaveId,
      leaveType:that.state.leaveTypeParams
    };
    api.GetDefaultPersonalInfo(params).then(res => {
      console.log('获取考勤部门信息:', res);
      if (res.status === 0) {
        let newform=that.state.form;
        newform.qjNum=res.data.workDetailId;//单号
        newform.leaveReason=res.data.leaveReason;//理由
        newform.containDays=res.data.days;//天数
        newform.startTime=res.data.startTime;//结束时间
        newform.endTime=res.data.endTime;//结束时间
        //类型
        //状态
        that.setState({
          form:newform
        })
      }

    })
  }


  //保存请假
  GetSaveLeave = () => {
    const that = this;
    let params = { "metaFormData": { "userinfo.departmentName": "总经理办公室", "userinfo.positionName": "总经理", "userinfo.systemUserName": "APP测试", "startTime": "2019-12-03 00:00:00", "endTime": "2020-01-02 00:00:00", "containDays": "0", "containHours": "0", "days": "30", "hours": "0", "creator": "APP测试", "createDateTime1": "2019-12-3 21:51:58", "id": "", "userinfo.id": "64", "leaveReason": "测试", "leaveType": "0", "attachedFile1": [] }, "type": "0", "id": "" }
    api.GetSaveLeave(params).then(res => {
      console.log('保存请假:', res);
      if (res.status === 0) {
        Toast.info(res.message);
      }

    })
  }

  //提交请假
  GetSubmitLeave=()=>{
    const that=this;
    that.state.isLock=true;
    //Toast.loading('正在提交');
    let params={
      id:that.state.leaveId,//传入的id
    };
    api.GetSubmitLeave(params).then(res=>{
      console.log('提交请假',res)
      if(res.status === 0){
        Toast.info("提交成功");       
      }else{
        Toast.info("提交失败");
      }
      that.state.isLock=false;
    })

  }

  //提交审核
  handleSubmit=()=>{

    this.GetSubmitLeave();
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
              <input value={this.state.form.qjNum} placeholder="请输入" onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{qjNum:e.target.value})}))}} />
            </div>
          </div>
          <div className="item">
            <div className="l">
              请假类型
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({ qjopen: true })}>{this.state.leaveTypeLabel || '请选择'}<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l black">
              开始时间
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({ dayopen: true })}>{this.state.form.startTime || '请选择'}<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l black">
              结束时间
              </div>
            <div className="r gray">
              <span onClick={() => this.setState({ dayopen2: true })}>{this.state.form.endTime || '请选择'}<i className="iconfont iconyou"></i></span>
            </div>
          </div>
          <div className="item">
            <div className="l">
              天数
              </div>
            <div className="r">
              <input value={this.state.form.containDays} placeholder="请输入"  onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{containDays:e.target.value})}))}} />
            </div>
          </div>
          <div className="item">
            <div className="l">
              状态
              </div>
            <div className="r">
              <input value={this.state.form.status} placeholder="请输入" onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{status:e.target.value})}))}}  />
            </div>
          </div>
          <div className="module-space"></div>
          <div className="other">
            <div className="tit">请假事由</div>
            <div>
              <textarea value={this.state.form.leaveReason} placeholder="" className="area-wrap" onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{leaveReason:e.target.value})}))}} ></textarea>
            </div>
          </div>
        </div>
        {/* 开始时间选择 */}
        <div className={this.state.dayopen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ dayopen: false })}></div>
          <div className="pick_box">
            <DatePickerView
              mode="datetime"
              value={this.state.startDateTime}
              onChange={(val) => { this.setState({ startDateTime: val }) }}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ dayopen: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={() => this.getDate('start')}>确定</Button>
            </div>
          </div>
        </div>
        {/* 结束时间选择 */}
        <div className={this.state.dayopen2 ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ dayopen: false })}></div>
          <div className="pick_box">
            <DatePickerView
              mode="datetime"
              value={this.state.endDateTime}
              onChange={(val) => { this.setState({ endDateTime: val }) }}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ dayopen2: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={() => this.getDate('end')}>确定</Button>
            </div>
          </div>
        </div>
        {/* 请假类型 */}
        <div className={this.state.qjopen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ qjopen: false })}></div>
          <div className="pick_box">
            <PickerView
              data={this.state.leaveTypeOptions}
              value={this.state.leaveType}
              cascade={false}
              onChange={this.onChangeQJtype}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ qjopen: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={this.getType}>确定</Button>
            </div>
          </div>
        </div>

        <div >
          <div className="footer-btn-group-space"></div>
          <div className="footer-btn-group">
            <div className="btn-group">
              {/* <button onClick={this.handleSubmit}>提交审核</button> */}
              <button className="">保存</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
