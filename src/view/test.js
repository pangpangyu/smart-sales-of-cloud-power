import React from 'react'
import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { Grid } from 'antd-mobile';

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.demo1 = this.demo1.bind(this);
        this.state = {
            txt:'change'
        }
    }
    demo1(){
        this.setState({
            txt:'test'
        })
    }
    render(){
        return (
            <div>
                <Link to={'/'}>{this.state.txt}</Link>
            </div>
        )
    }
}