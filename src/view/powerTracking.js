import React from 'react'
import Header from '../components/header'

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render(){
        return (
            <div>
                <Header title='电量跟踪' back={true} search={false}></Header>
            </div>
        )
    }
}