import React from 'react'
import Header from '../components/header'
import { Link } from 'react-router-dom'
import NoData from '../components/noData';

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render(){
        return (
            <div style={{ minHeight: '100vh', background: '#f0f1f3' }}>
                <Header title='结算管理' back={true} search={false}></Header>
            </div>
        )
    }
}