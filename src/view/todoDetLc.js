import React from 'react'
import Header from '../components/header';
import api from '../api';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			id: this.props.match.params.id,
			type: '',
			businessKey: '',
			taskId: '',
			title: '',
			centent: '',
			centent2:'',
			diagram: '',
			history: [],
			yuanyin:'',
			data:[]
		}
	}

	componentWillMount() {
		const that = this
		that.getDetailData()
	}
	componentDidMount() {

	}

	getDetailData = () => {
		//let params = `?id=2225065`
		let params = `?id=${this.state.id}`
		sessionStorage.removeItem('history')
		api.getmodelsNutsWorkflowProcessTask(params).then(res => {
			if (res.status === -1 && res.data.url !== '') {
				this.setState({
					type: res.data.businessType,
					taskId: res.data.taskId,
					businessKey: res.data.businessKey,
				}, () => {
					this.getDataByType(res.data.url)
				})
			} else {
				Toast.fail('数据异常', 1, () => {
					window.history.go(-1)
				}, true);
			}
		})
	}

	getDataByType = (url) => {
		let params = `?taskId=${this.state.taskId}&id=${this.state.businessKey}`
		// let params = `?taskId=2225065&id=77`
		api.getThingDetail(url, params).then(res => {
			if (res.status === 0) {
				this.setState({
					// title: res.data.form.fields[2][0].value,
					// centent: res.data.form.fields[4][0].value,
					// diagram: res.data.diagram.url,
					// history: res.data.history
					// title: res.data.form.fields[3][0].value,
					title: res.data.form.title === '审批' ? '信息发布审批' : res.data.form.title,
					// centent: res.data.form.fields[8][0].value,
					// centent2: res.data.form.fields[4][0].value,
					// yuanyin: res.data.form.fields[4][0].value,
					data: res.data.form.fields,
					diagram: res.data.diagram.url,
					history: res.data.history
				}, () => {
					let arr = res.data.history
					sessionStorage.setItem('history', arr)
				})
			} else {
				api.getAuditMeta(params).then(res => {
					this.setState({
						// title: res.data.form.fields[3][0].value,
						title: res.data.form.title === '审批' ? '信息发布审批' : res.data.form.title,//res.data.form.title,
						// centent: res.data.form.fields[8][0].value,
						// centent2: res.data.form.fields[4][0].value,
						// yuanyin: res.data.form.fields[4][0].value,
						data: res.data.form.fields,
						diagram: res.data.diagram.url,
						history: res.data.history
					}, () => {
						let arr = res.data.history
						sessionStorage.setItem('history', JSON.stringify(arr))
					})
				}).catch(e => {
					Toast.fail('存在未知元数据，请联系技术人员处理', 0);
				})
			}
		})
		// if(this.state.type === 'models_business_Contract'){
		// 	api.getBusinessContract(params).then(res => {
		// 		this.setState({
		// 			title:res.data.form.fields[2][0].value,
		// 			centent:res.data.form.fields[4][0].value,
		// 			diagram:res.data.diagram.url,
		// 			history:res.data.history
		// 		},()=>{
		// 			let arr = res.data.history
		// 			sessionStorage.setItem('history',arr)
		// 		})
		// 	})
		// }else{
		// 	//models_attendance_LeaveManagement
		// 	api.getAttendanceLeaveManagemen(params).then(res => {
		// 		this.setState({
		// 			title:res.data.form.fields[2][0].value,
		// 			centent:res.data.form.fields[4][0].value,
		// 			diagram:res.data.diagram.url,
		// 			history:res.data.history
		// 		},()=>{
		// 			let arr = res.data.history
		// 			sessionStorage.setItem('history',JSON.stringify(arr))
		// 		})
		// 	})
		// }
	}

	render() {
		return (
			<div className="page_bg">
				<Header title={'待办事项详情'} back={true} search={false}></Header>
				<div className="tododet">
					<div className="top">
						<h3>{this.state.title}</h3>
						{/* <p>[{this.state.id}]</p> */}
					</div>
					<div className="cont">
						<div className="process">
							{/* <p style={{margin:'10px 0'}}>审批意见/退回原因：-</p> */}
							{/* <div className="img">
								<div style={{padding:'15px 0 5px 0',borderTop:'1px solid #eee',marginTop:'15px'}}>内容介绍</div>
								<div style={{padding:'5px 10px'}} dangerouslySetInnerHTML={{ __html: this.state.centent2 }}></div>
								<div style={{padding:'15px 0 5px 0',borderTop:'1px solid #eee',marginTop:'15px'}}>内容</div>
								<div style={{padding:'5px 10px'}} dangerouslySetInnerHTML={{ __html: this.state.centent }}></div>
							</div> */}
							{ this.state.data && this.state.data.map((item,index) => {
								return <div key={index}>
									{ item.type !== "hidden" && <div className={(item[0].type === "editor" || item[0].type === "textarea") ? 'editor' : 'item'}>
										<div className="l">{item[0]['label']}</div>
										{ item[0].options && item[0].options.length > 0 && <div  className="r">
											{ !item[0].value && '--' }
											{ item[0].value && item[0].options.filter(i => i.value === item[0].value )[0].text }
										</div> }
										{ !item[0].options && <div className="r" dangerouslySetInnerHTML={{ __html: item[0].value || '-' }}></div> }
									</div> }
							</div>
							})
							}
						</div>
					</div>
					<div className="f_btn">
						<Link to={`/todoDetList/${this.state.id}?name=${this.state.title}`}>流程轨迹</Link>
						<Link to={`/todoDet/${this.state.id}?diagram=${this.state.diagram}&name=${this.state.title}`}>流程图</Link>
					</div>
				</div>
			</div>
		)
	}
}