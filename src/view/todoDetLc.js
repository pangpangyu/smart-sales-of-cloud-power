import React from 'react'
import Header from '../components/header';
import api from '../api';
import { Link } from 'react-router-dom';

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            id:this.props.match.params.id
        }
    }

    componentDidMount(){

    }

    getDetailData = () => {
        
    }

    render() {
        return (
            <div className="page_bg">
                <Header title={'待办事项详情'} back={true} search={false}></Header>
                <div className="tododet">
                    <div className="top">
                        <h3>山西电力合同审核流程图</h3>
                        <p>[流程编号]</p>
                    </div>
                    <div className="cont">
                        <div className="process">
                            <p>办理意见 请签批</p>
                            <div className="img">
                                <img src={require('../assets/img/img202.jpg')}></img>
                            </div>
                        </div>
                    </div>
                    <div className="f_btn">
                        <Link to={`/todoDetList/${this.state.id}`}>流程轨迹</Link>
                        <Link to={`/todoDet/${this.state.id}`}>流程图</Link>
                    </div>
                </div>
            </div>
        )
    }
}