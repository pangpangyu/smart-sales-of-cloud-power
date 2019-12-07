import React from 'react'
import Header from '../components/header'
import { Button } from 'antd-mobile';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="page_bg">
                <Header title={'待办事项详情'} back={true} search={false}></Header>
                <div className="tododet">
                    <div className="top">
                        <h3>山西电力合同审核流程图</h3>
                        <p>下图为示例图，具体流程图按照查看的流程图显示</p>
                    </div>
                    <div className="cont">
                        <div className="step_list">
                            <ul>
                                <li>开始</li>
                                <li><span>1</span>步骤1</li>
                                <li><span>2</span>步骤2</li>
                                <li><span>3</span>步骤3</li>
                                <li><span>4</span>步骤4</li>
                                <li>结束</li>
                            </ul>
                        </div>
                    </div>
                    <div className="f_btn">
                    <Button className="btn" type="primary">关闭</Button>
                    </div>
                </div>
            </div>
        )
    }
}