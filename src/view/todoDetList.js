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
                    </div>
                    <div className="cont contpd">
                        <div className="det_list">
                            <ul>
                                <li>
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
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="f_btn">
                        <Button className="btn" type="primary" onClick={()=> window.history.go(-1)}>关闭</Button>
                    </div>
                </div>
            </div>
        )
    }
}