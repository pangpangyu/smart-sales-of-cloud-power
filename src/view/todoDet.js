import React from 'react'
import Header from '../components/header'

export default class Todolist extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header title={'待办事项详情'} back={true} search={false}></Header>
            </div>
        )
    }
}