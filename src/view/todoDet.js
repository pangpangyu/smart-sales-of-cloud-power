import React from 'react'
import Header from '../components/header'
import { Button } from 'antd-mobile';
import { getDataQuery } from '../utils/index'
import { baseImgUrl } from '../config/index'

export default class Todolist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			diagram: getDataQuery('diagram') || ''
		}
	}
	render() {
		return (
			<div className="page_bg">
				<Header title={'待办事项详情'} back={true} search={false}></Header>
				<div className="tododet">
					<div className="top">
						<h3>{getDataQuery('name')}审核流程图</h3>
						<p>下图为示例图，具体流程图按照查看的流程图显示</p>
					</div>
					<div className="cont">
						<div className="step_list">
							<img src={baseImgUrl + this.state.diagram} alt="" style={{maxWidth:'100%'}}/>
							{/* <ul>
								<li>开始</li>
								<li><span>1</span>步骤1</li>
								<li><span>2</span>步骤2</li>
								<li><span>3</span>步骤3</li>
								<li><span>4</span>步骤4</li>
								<li>结束</li>
							</ul> */}
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