import React from 'react'

export default class Test extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <div className="todolist">
                    <ul>
                        <li>
                            <p><span>业务名称：</span>五十六号合同审批流程</p>
                            <p><span>发起人</span>张先生</p>
                            <p><span>发起时间</span>2019-08-12 09:50:00</p>
                            <p>流程环节</p>
                            <p><span>已停留时间</span>1天零08分钟</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}