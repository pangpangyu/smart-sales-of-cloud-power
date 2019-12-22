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
      leaveCode:`${getDataQuery('leaveCode')}`,
      applyType:`${getDataQuery('applyType')}`,
      addStatus:`${getDataQuery('addStatus')}`,//1-新增
      editType:`${getDataQuery('editType')}`,
      title: title,
      dayopen: false,
      dayopen2: false,
      qjopen: false,
      time: now,

      startDateTime: now,
      endDateTime: now,
      leaveType: "",
      jsType:"",
      leaveTypeLabel:`${getDataQuery('type')}`,
      jsTypeLabel:'',//加班结算类型

      leaveTypeOptions: [],//请假/加班/外出类型
      settlementOptions:[],//加班结算方式
     
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
        days:"",

        //外出
        egressAddress:'',
        egressType:0,
        waichuIds:[],

        //加班结算类型值
        jiesuanChooseType:0,
        jiabanIds:[],
    
      },
      
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


  //结算类型选择
  onChangeJStype = (val) => {
    this.setState({
      jsType: val
    })
  }


  getType2 = () => {
    var typeVal = (this.state.jsType && this.state.jsType[0]) || "0"
    this.setState({
      jsopen: false,
      jsTypeLabel: getListItem(this.state.settlementOptions, 'value', typeVal || "0")[0].label,
      form: Object.assign({}, this.state.form, { jiesuanChooseType: typeVal }),
    });
  }

  getDate = (type) => {
    const that = this;
    // this.getTimeDiff();
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
      that.GetSettlementTypeOptions();//加班结算方式
      that.setState({
        title:"加班"
      })
    }

    //获取详细信息
    if(that.state.leaveId!="null"){
      if(that.state.editType=="qjedit"){
        that.GetDefaultPersonalInfo();//获取考勤部门信息
        that.GetleaveTypeOptions();//获取请假类型
        that.setState({
          title:"请假"
        })
      }
      if(that.state.editType=="wcedit"){
        that.GetDefaultEgressInfo();//获取外出部门信息1
        that.GetEgressUserTableData();//获取请假人
        that.GetEgressTypeOptions();//获取外出类型
        that.setState({
          title:"外出"
        })

      }
      if(that.state.editType=="jbedit"){
        that.GetDefaultOvertimeInfo();//获取加班部门信息1
        that.GetOvertimeTypeOptions();//获取加班类型
        that.GetSettlementTypeOptions();//加班结算方式
        that.setState({
          title:"加班"
        })
      }
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

  //加班结算方式
  GetSettlementTypeOptions=()=>{
    const that = this;
    let params = {}
    api.GetSettlementTypeOptions(params).then(res => {
      console.log('加班结算方式:', res);
      let rawData = res.data || [];
      let options = rawData.map((option) => {
        return { label: option.text, value: option.value }
      })
      if (res.status === 0) {
        that.setState({
          settlementOptions: options
        })
      }
    })
  }

  //保存加班用户-新增
  OneOvertimeInfoSave=()=>{
    const that = this;
    let params = {
      "metaFormData": {
        "id": "",
        "startTime": that.state.form.startTime,
        "endTime":that.state.form.endTime,
        "containDays": "0",
        "containHours": "0",
        "days": that.state.form.days,
        "hours": "0",
        "department.id": "14",//部门id
        "position.id": "21",//职务id
        "userInfo.id": "64",//用户id
        "overtimeType":that.state.form.type,
        "settlementWayType": that.state.form.jiesuanChooseType
      },
      "type": "add",
      "id": "",
      "overtimeId": "",
      "ids1": []
    };
    api.OneOvertimeInfoSave(params).then(res => {
      console.log('加班用户:', res);
      if (res.status === 0) {
        let newForm=that.state.form;
        newForm.jiabanIds=[res.data];
        that.setState({
          form:newForm
        })
        that.OneOvertimeSave();
      }
    })
  }

  //保存外出用户-新增
  OneEgressInfoSave=()=>{
    const that = this;
    let params = {
      "metaFormData": {
        "id": "",
        "department.id": "14",//部门id
        "position.id": "21",//用户id
        "userInfo.id": "64"//职务id
      },
      "type": "add",
      "id": "",
      "egressId": "",
      "ids1": []
    }
    api.OneEgressInfoSave(params).then(res => {
      console.log('外出用户:', res);
      if (res.status === 0) {
        let newForm=that.state.form;
        newForm.waichuIds=[res.data];
        that.setState({
          form:newForm
        })
        that.OneEgressSave();
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
        newform.leaveReason=res.data.leaveReason;//理由
        newform.days=res.data.days;//天数
        newform.startTime=res.data.startTime;//结束时间
        newform.endTime=res.data.endTime;//结束时间
        newform.departmentName=res.data.departmentName;
        newform.positionName=res.data.positionName;
        newform.systemUserName=res.data.systemUserName;


        that.setState({
          form:newform
        })
        
      }

    })
  }

  //获取外出信息详细
  GetDefaultEgressInfo=()=>{
    const that=this;
    let params={
      id:that.state.leaveId,
    };
    api.GetDefaultEgressInfo(params).then(res => {
      console.log('获取外出信息详细1:', res);
      if (res.status === 0) {
        let newform=that.state.form;
        newform.leaveReason=res.data.egressReason;//理由
        newform.startTime=res.data.startTime;//结束时间
        newform.endTime=res.data.endTime;//结束时间
        newform.egressAddress=res.data.egressAddress;//外出地点
        newform.egressType=res.data.egressType;//外出类型
        that.setState({
          form:newform
        })
        
      }

    })
  }

  //获取外出请假人
  GetEgressUserTableData=()=>{
    const that=this;
    let params={
      "rowNumber":0,
      "pageSize":10,
      //"ids1":[that.state.leaveId]
      "ids1":[that.state.leaveId]
    };
    api.GetEgressUserTableData(params).then(res => {
      console.log('获取外出请假人:', res);
      if (res.status === 0) {
   
      }
    })
  }


  //获取加班信息详细1
  GetDefaultOvertimeInfo=()=>{
    const that=this;
    let params={
      id:that.state.leaveId,
    };
    api.GetDefaultOvertimeInfo(params).then(res => {
      console.log('获取加班信息详细1:', res);
      if (res.status === 0) {
        let newform=that.state.form;
        newform.leaveReason=res.data.overtimeReason;//理由
        newform.jiabanIds=res.data.overtimeInfoIds;
        that.setState({
          form:newform
        })
        that.GetOvertimeInfoTableData();
      }

    })
  }

  //获取加班请假人
  GetOvertimeInfoTableData=()=>{
    const that=this;
    let params={
      "rowNumber": 0,
      "pageSize": 10,
      "ids1": that.state.form.jiabanIds,
      "overtimeId": that.state.leaveId
    };
    api.GetOvertimeInfoTableData(params).then(res => {
      console.log('获取加班请假人:', res);
      if (res.status === 0) {
        let newform=that.state.form;
        newform.startTime=res.data.rows[0].startTime;//结束时间
        newform.endTime=res.data.rows[0].endTime;//结束时间
        that.setState({
          jsTypeLabel:res.data.rows[0].settlementWayType
        })
        
      }

    })
  }

  //保存请假
  GetSaveLeave = () => {
    const that = this;
    Toast.loading('正在保存');
    let params = { 
      "metaFormData": { 
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
        "id":that.state.leaveId!="null"?that.state.leaveId:'', 
        "userinfo.id": "64", 
        "leaveReason": that.state.form.leaveReason, 
        "leaveType": 0, 
        "attachedFile1": [] 
      }, 
      "type": "0",
	    "id": that.state.leaveId!="null"?that.state.leaveId:''
      
    }
    console.log(params)
    api.GetSaveLeave(params).then(res => {
      console.log('保存请假:', res);
      if (res.status === 0) {
        Toast.info(res.message);
        if(that.state.addStatus==1){
          setTimeout(function(){
            window.history.go(-1)
          },1000)
        }
      }else{
        Toast.info(res.message);
      }

    })
  }

  //提交请假审核
  GetSubmitLeave=()=>{
    const that=this;
    Toast.loading('正在提交');
    api.GetSubmitLeave(that.state.leaveId).then(res=>{
      console.log('提交请假',res)
      if(res.status === 0){
        Toast.info(res.message);   
        setTimeout(function(){
          window.history.go(-1)
        },1000)    
      }else{
        Toast.info(res.message);
      }
    })

  }

  //保存外出
  OneEgressSave=()=>{
    const that=this;
    Toast.loading('正在保存');
    let params={
      "metaFormData": {
        "startTime": that.state.form.startTime, 
        "endTime": that.state.form.endTime, 
        "days": that.state.form.days, 
        "containDays": "",
        "containHours": "",
        "hours": "0",
        "egressAddress": that.state.form.egressAddress,
        "creator": "APP测试",
        "createDateTime1": "",
        "id": "",
        "egressReason": that.state.form.leaveReason,
        "egressType": that.state.form.egressType,
        "attachedFile1": []
      },
      "type": "add",
      "id": "",
      "ids1": that.state.form.waichuIds,
      "egressId": ""
    };
    api.OneEgressSave(params).then(res => {
      console.log('保存外出:', res);
      if (res.status === 0) {
        Toast.info(res.message);
        if(that.state.addStatus==1){
          setTimeout(function(){
            window.history.go(-1)
          },1000)
        }
      }else{
        Toast.info(res.message);
      }

    })
  }

  //提交外出审核
  EgressSubmitSign=()=>{
    const that=this;
    Toast.loading('正在提交');
    api.EgressSubmitSign(that.state.leaveId).then(res=>{
      console.log('提交外出审核',res)
      if(res.status === 0){
        Toast.info(res.message);
        setTimeout(function(){
          window.history.go(-1)
        },1000)  
      }else{
        Toast.info(res.message);
      }
    })
  }

  //保存加班
  OneOvertimeSave=()=>{
    const that=this;
    Toast.loading('正在保存');
    let params={
      "metaFormData": {
        "creator": "",
        "createDateTime1": "",
        "id": "",
        "overtimeReason": that.state.form.leaveReason,
        "attachedFile1": []
      },
      "type": "",
      "id": "",
      "ids1": that.state.form.jiabanIds,
      "overtimeId": that.state.leaveId
    };

    api.OneOvertimeSave(params).then(res => {
      console.log('保存加班:', res);
      if (res.status === 0) {
        Toast.info(res.message);
        if(that.state.addStatus==1){
          setTimeout(function(){
            window.history.go(-1)
          },1000)
        }
      }else{
        Toast.info(res.message);
      }

    })
  }

  //提交加班审核
  OvertimeSubmitSign=()=>{
    const that=this;
    Toast.loading('正在提交');
    api.OvertimeSubmitSign(that.state.leaveId).then(res=>{
      console.log('提交加班审核',res)
      if(res.status === 0){
        Toast.info(res.message);   
        setTimeout(function(){
          window.history.go(-1)
        },1000)      
      }else{
        Toast.info(res.message);
      }
    })
  }


  //保存
  handleSave=()=>{
    const that=this;
    that.setState({
      isSave:true
    })

    //新增
    if(that.state.applyType=="qjsq"||that.state.editType=="qjedit"){//请假
      that.GetSaveLeave();
    }

    if(that.state.applyType=="wcsq"){//外出
      that.OneEgressInfoSave();//保存外出用户
    }

    if(that.state.applyType=="jbsq"){//加班
      that.OneOvertimeInfoSave();//保存加班用户
    }


    //编辑
    if(that.state.editType=="wcedit"){//外出
      that.OneEgressSave();
    }

    if(that.state.editType=="jbedit"){//加班
      that.OneOvertimeSave();
    }
    
  }

  //提交审核
  handleSubmit=()=>{
    const that=this;
    Toast.loading('正在提交');
    if(that.state.isSave){
      if(that.state.applyType=="qjsq"||that.state.editType=="qjedit"){//请假
        that.GetSubmitLeave();
      }
  
      if(that.state.applyType=="wcsq"||that.state.editType=="wcedit"){//外出
        that.EgressSubmitSign();
      }
  
      if(that.state.applyType=="jbsq"||that.state.editType=="jbedit"){//加班
        that.OvertimeSubmitSign();
      }

    }else{
      Toast.info("请先保存");
    }
  }

  getTimeDiff=()=>{
    let begin=this.state.form.startTime;
    let end=this.state.form.endTime;

    if(!begin||!end){
      return "0天"
    }

    if(begin>end){//交换时间
      var tempTime=this.state.startDateTime;
      this.setState({
        form:Object.assign({},this.state.form,{startTime:end,endTime:begin}),
        startDateTime:this.state.endDateTime,
        endDateTime:tempTime
      })
      return "开始时间不能大于结束时间";
    }

    // alert( new Date('2019/12/24 21:53:00'))
    begin = new Date(begin.replace(/-/g,'/'));
    end = new Date(end.replace(/-/g,'/'));


    

    //时间相差毫秒数
    let span = end.getTime() - begin.getTime();
    
    // console.info(span);//36290000
    //计算相差天数
    let result = '';
    // let days = Math.floor(span / (24 * 3600 * 1000));
    // result += days + '天';
    //相差小时数
    // let leave1 = span % (24 * 3600 * 1000);
    // let hours = Math.floor(leave1 / (3600 * 1000))
    // result += hours + '小时';
    //相差分钟
    // var leave2 = leave1 % (3600 * 1000)
    // var minutes = Math.floor(leave2 / (60 * 1000));
    // result += minutes + '分钟';
    // //相差秒
    // var level3 = leave2 % (60 * 1000)
    // var seconds = Math.round(level3 / 1000);
    // result += seconds + '秒';
    // console.info(result); 

    let days = span / (24 * 3600 * 1000);
    days=days.toFixed(0) 
    result += days+ '天';

    // 保存计算天数到表单
    if(this.state.form.days!==days){
      this.setState({
        form:Object.assign({},this.state.form,{days:days})
      })
      return "";
    }    
    return result;
  }


  render() {
    let footerBtnSumit=
      <button onClick={this.handleSubmit}>提交审核</button>
    let footerBtn=
        <div>
          <div className="footer-btn-group-space"></div>
          <div className="footer-btn-group">
            <div className="btn-group">
              {this.state.addStatus==1?'':footerBtnSumit}
              <button onClick={this.handleSave} className="btn-white">保存</button>
            </div>
          </div>
        </div>
    let itemDanhao=
        <div className="item">
          <div className="l">
            {this.state.title}单号
            </div>
          <div className="r">
            {this.state.leaveCode}
          </div>
        </div>
    let jiesuanType=
          <div className="item">
          <div className="l">
            结算类型
            </div>
          <div className="r gray">
            <span onClick={() => this.setState({ jsopen: true })}>{this.state.jsTypeLabel || '请选择'}<i className="iconfont iconyou"></i></span>
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
            {this.state.title}类型
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
              {/* {this.state.form.days} */}
              {this.getTimeDiff()}
            </div>
          </div>

          {this.state.applyType=="jbsq"?jiesuanType:''}
          {this.state.editType=="jbedit"?jiesuanType:''}
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
            <div className="tit">{this.state.title}事由</div>
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

        {/* 加班结算*/}
        <div className={this.state.jsopen ? 'modal on' : 'modal'}>
          <div className="modal_bg" onClick={() => this.setState({ qjopen: false })}></div>
          <div className="pick_box">
            <PickerView
              data={this.state.settlementOptions}
              value={this.state.jsType}
              cascade={false}
              onChange={this.onChangeJStype}
            />
            <div className="module-space"></div>
            <div className="btns">
              <Button className="btn" type="primary" onClick={() => this.setState({ jsopen: false })}>取消</Button>
              <Button className="btn btn1" type="primary" onClick={this.getType2}>确定</Button>
            </div>
          </div>
        </div>

        {this.state.status=="未提交"?footerBtn:''}
        {this.state.status=="申请"?footerBtn:''}
      </div>
    )
  }
}
