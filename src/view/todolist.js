import React from 'react'
import Header from '../components/header'

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <Header title={'待办事项'} back={true} search={false}></Header>
                <div className="todolist">
                    <ul>
                        <li>
                            <a href="#">
                                <p><span>业务名称：</span>五十六号合同审批流程 <label>[流程编号]</label></p>
                                <p><span>发起人：</span>张先生</p>
                                <p><span>发起时间：</span>2019-08-12 09:50:00</p>
                                <p>流程环节</p>
                                <p><span>已停留时间：</span>1天零08分钟</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <p><span>业务名称：</span>五十六号合同审批流程 <label>[流程编号]</label></p>
                                <p><span>发起人：</span>张先生</p>
                                <p><span>发起时间：</span>2019-08-12 09:50:00</p>
                                <p>流程环节</p>
                                <p><span>已停留时间：</span>1天零08分钟</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <p><span>业务名称：</span>五十六号合同审批流程 <label>[流程编号]</label></p>
                                <p><span>发起人：</span>张先生</p>
                                <p><span>发起时间：</span>2019-08-12 09:50:00</p>
                                <p>流程环节</p>
                                <p><span>已停留时间：</span>1天零08分钟</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}