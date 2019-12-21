import React from 'react'
import Header from '../components/header';
import api from '../api';
import { Link } from 'react-router-dom';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			id: this.props.match.params.id,
			type:'',
			businessKey:'',
			taskId:'',
			title:'',
			centent:'',
			diagram:''
		}
	}

	componentWillMount() {
		const that = this
		that.getDetailData()
	}
	componentDidMount() {

	}

	getDetailData = () => {
		let params = `?id=${this.state.id}`
		api.getmodelsNutsWorkflowProcessTask(params).then(res => {
			this.setState({
				type:res.data.businessType,
				taskId:res.data.taskId,
				businessKey:res.data.businessKey
			},()=>{
				this.getDataByType()
			})
		})
	}

	getDataByType = () => {
		let params = `?taskId=${this.state.taskId}&id=${this.state.businessKey}&_=${new Date().getTime()}`
		if(this.state.type === 'models_business_Contract'){
			api.getBusinessContract(params).then(res => {
				this.setState({
					title:res.data.form.fields[2][0].value,
					centent:res.data.form.fields[4][0].value,
					diagram:res.data.diagram.url
				})
			})
		}else{
			//models_attendance_LeaveManagement
			api.getAttendanceLeaveManagemen(params).then(res => {
				
			})
		}
	}

	render() {
		return (
			<div className="page_bg">
				<Header title={'待办事项详情'} back={true} search={false}></Header>
				<div className="tododet">
					<div className="top">
						<h3>{this.state.title}</h3>
						<p>[{this.state.id}]</p>
					</div>
					<div className="cont">
						<div className="process">
							<p>办理意见 请签批</p>
							<div className="img">
								{/* <img src={require('../assets/img/img202.jpg')}></img> */}
								<div dangerouslySetInnerHTML={{__html:this.state.centent}}></div>
							</div>
						</div>
					</div>
					<div className="f_btn">
						<Link to={`/todoDetList/${this.state.id}`}>流程轨迹</Link>
						<Link to={`/todoDet/${this.state.id}?diagram=${this.state.diagram}&name=${this.state.title}`}>流程图</Link>
					</div>
				</div>
			</div>
		)
	}
}