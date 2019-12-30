import React from 'react'
import Header from '../components/header'
import { Button } from 'antd-mobile';
import { getDataQuery, formatTime } from '../utils/index';
import NoData from '../components/noData';

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history:[],
			nodata:false
		}
	}

	componentWillMount(){
		let arr = window.sessionStorage.getItem('history') || []
		arr = JSON.parse(arr)
		this.setState({
			history:arr,
			nodata:arr.length > 0 ? false : true
		})
		console.log(arr.length)
	}

	render() {
		return (
			<div className="page_bg">
				<Header title={'待办事项'} back={true} search={false}></Header>
				<div className="tododet">
					<div className="top">
						<h3>{getDataQuery('name')}审核流程图</h3>
					</div>
					<div className="cont contpd">
						<div className="det_list">
							<ul>
								{ this.state.history && this.state.history.map((item,index) => {
									return <li key={index}>
													<div className="title">
														<p>{item.userName}</p>
													</div>
													<div className="web">
														<p><span>办理人员：</span>{item.task.name}</p>
														<p><span>开始时间：</span>{formatTime(item.task.startTime)}</p>
														<p><span>操作时间：</span>{formatTime(item.task.endTime)}</p>
														<p><span>办理意见：</span>{item.comment}</p>
														{/* <div className="result">
															<span>已办理</span>
															<p className="on">不同意</p>
														</div> */}
													</div>
												</li>
								}) }
								{/* <li>
									<div className="title">
										<p>发起</p>
									</div>
									<div className="web">
										<p><span>办理人员：</span>张三</p>
										<p><span>开始时间：</span>2019-08-12 09:50:00</p>
										<p><span>操作时间：</span>2019-08-12 09:50:00</p>
										<p><span>办理意见：</span>—</p>
										<div className="result">
											<span>已办理</span>
											<p className="on">不同意</p>
										</div>
									</div>
								</li>
								<li>
									<div className="title">
										<p>环节01</p>
									</div>
									<div className="web">
										<p><span>办理人员：</span>张三</p>
										<p><span>开始时间：</span>2019-08-12 09:50:00</p>
										<p><span>操作时间：</span>2019-08-12 09:50:00</p>
										<p><span>办理意见：</span>—</p>
										<div className="result">
											<span>已办理</span>
											<p>同意</p>
										</div>
									</div>
								</li>
								<li>
									<div className="title">
										<p>环节02</p>
									</div>
									<div className="web">
										<p><span>办理人员：</span>张三</p>
										<p><span>开始时间：</span>2019-08-12 09:50:00</p>
										<p><span>操作时间：</span>2019-08-12 09:50:00</p>
										<p><span>办理意见：</span>—</p>
										<div className="result">
											<span>已办理</span>
											<p className="on">不同意</p>
										</div>
									</div>
								</li> */}
							</ul>
							{ this.state.nodata && <NoData/> }
						</div>
					</div>
					<div className="f_btn">
						<Button className="btn" type="primary" onClick={() => window.history.go(-1)}>关闭</Button>
					</div>
				</div>
			</div>
		)
	}
}