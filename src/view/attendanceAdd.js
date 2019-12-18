import React from 'react';
import Header from '../components/header';
import { DatePickerView, PickerView, Button, Toast } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import api from '../api/index';
import { getDataQuery } from '../utils/index';

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
  return `${dateStr} ${timeStr}:00`;
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
    console.log(`${getDataQuery('applyType')}`)
    let title = '请假';
    this.state = {
      leaveTypeParams:`${getDataQuery('type')}`,
      status:`${getDataQuery('status')}`,
      leaveId:`${getDataQuery('id')}`,
      applyType:`${getDataQuery('applyType')}`,
      addStatus:`${getDataQuery('addStatus')}`,//1-新增
      title: title,
      dayopen: false,
      dayopen2: false,
      qjopen: false,
      time: now,

      startDateTime: now,
      endDateTime: now,
      leaveType: "",
      leaveTypeLabel:`${getDataQuery('type')}`,

      leaveTypeOptions: [],//请假类型
      isLock:false,
      isSave:false,


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
        status:"",
        days:""
      }
    }

  }

  //重置数据
  resetForm=()=>{

    this.setState({
      form:Object.assign({
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
        status:"",
        days:""
      }),
      leaveTypeLabel:""
    })
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
    if(that.state.applyType=="qjsq"){
      that.GetleaveTypeOptions();//获取请假类型
      that.setState({
        title:"请假"
      })
    }

    if(that.state.applyType=="wcsq"){
      that.GetEgressTypeOptions();//获取外出类型
      that.setState({
        title:"外出"
      })
    }

    if(that.state.applyType=="jbsq"){
      that.GetOvertimeTypeOptions();//获取加班类型
      that.setState({
        title:"加班"
      })
    }

    if(that.state.leaveId!="null"){
      that.GetDefaultPersonalInfo();//获取考勤部门信息
    }

    //新增申请
    if(that.state.addStatus==1){
      that.resetForm();
      that.setState({
        status:"申请"
      })
    }
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

  //获取加班类型
  GetOvertimeTypeOptions=()=>{
    const that = this;
    let params = {}
    api.GetOvertimeTypeOptions(params).then(res => {
      console.log('加班类型:', res);
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

  //外出类型
  GetEgressTypeOptions=()=>{
    const that = this;
    let params = {}
    api.GetEgressTypeOptions(params).then(res => {
      console.log('外出类型:', res);
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
        newform.days=res.data.days;//天数
        newform.startTime=res.data.startTime;//结束时间
        newform.endTime=res.data.endTime;//结束时间
        //类型
        //状态
        newform.departmentName=res.data.departmentName;
        newform.positionName=res.data.positionName;
        newform.systemUserName=res.data.systemUserName;


        that.setState({
          form:newform
        })
        
      }

    })
  }


  //保存请假
  GetSaveLeave = () => {
    const that = this;
    let params = { 
      "metaFormData": { 
        // "userinfo.departmentName": that.state.form.departmentName, 
        // "userinfo.positionName":that.state.form.positionName, 
        // "userinfo.systemUserName": that.state.form.systemUserName, 
        "userinfo.departmentName": "总经理办公室", 
        "userinfo.positionName":"总经理", 
        "userinfo.systemUserName": "APP测试", 
        "startTime": that.state.form.startTime, 
        "endTime": that.state.form.endTime, 
        "days": that.state.form.days, 
        "containDays": '', 
        "containHours": "0", 
        "hours": "0", 
        "creator": "", 
        "createDateTime1": "", 
        "id": "", 
        "userinfo.id": "", 
        "leaveReason": "", 
        "leaveType": 0, 
        "attachedFile1": [] 
      }, 
      "type": "0",
	    "id": ""
      
    }
    console.log(params)
    api.GetSaveLeave(params).then(res => {
      console.log('保存请假:', res);
      if (res.status === 0) {
        Toast.info(res.message);
        if(that.state.addStatus==1){//新增申请时
           setTimeout(function(){
              window.history.go(-1)
           },1000)
        }
      }else{
        Toast.info(res.message);
      }

    })
  }

  //提交审核
  GetSubmitLeave=()=>{
    const that=this;
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
    })

  }

  //保存
  handleSave=()=>{
    const that=this;
    that.setState({
      isSave:true
    })
    that.GetSaveLeave();
  }

  //提交审核
  handleSubmit=()=>{
    const that=this;
    Toast.info("正在提交");
    if(that.state.isSave){
      that.GetSubmitLeave();
      // if(that.state.addStatus==1){//新增申请时
      //   window.history.go(-1)
      // }
    }else{
      Toast.info("请先保存");
    }
  }


  render() {
    let footerBtn=
        <div>
          <div className="footer-btn-group-space"></div>
          <div className="footer-btn-group">
            <div className="btn-group">
              <button onClick={this.handleSubmit}>提交审核</button>
              <button onClick={this.handleSave} className="btn-white">保存</button>
            </div>
          </div>
        </div>
    let itemDanhao=
        <div className="item">
          <div className="l">
            请假单号
            </div>
          <div className="r">
            {/* <input value={this.state.form.qjNum} placeholder="请输入" onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{qjNum:e.target.value})}))}} /> */}
            {this.state.form.qjNum}
          </div>
        </div>
    return (
      <div>
        <Header title={this.state.title} back={true}></Header>
        <div className="attendnce-add">
          {/* 新增时，不显示请假单号 */}
          {this.state.addStatus!=1?itemDanhao:''}
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
              {/* <input value={this.state.form.days} placeholder="请输入"  onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{days:e.target.value})}))}} /> */}
              {this.state.form.days}
            </div>
          </div>
          <div className="item">
            <div className="l">
              状态
              </div>
            <div className="r">
              {/* <input value={this.state.form.status} placeholder="请输入" onChange={(e)=>{this.setState(this.setState({form:Object.assign({},this.state.form,{status:e.target.value})}))}}  /> */}
              {this.state.status}
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

        {this.state.status=="未提交"?footerBtn:''}
        {this.state.status=="申请"?footerBtn:''}
      </div>
    )
  }
}
