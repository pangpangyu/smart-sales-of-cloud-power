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
            <div className="page_bg">
                <Header title={'待办事项详情'} back={true} search={false}></Header>
                <div className="tododet">
                    <div className="top">
                        <h3>山西电力合同审核流程图</h3>
                        <p>下图为示例图，具体流程图按照查看的流程图显示</p>
                    </div>
                    <div className="cont">
                        
                    </div>
                    <div className="f_btn">
                        <a href="#">关闭</a>
                    </div>
                </div>
            </div>
        )
    }
}