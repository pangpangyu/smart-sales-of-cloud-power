import React from 'react';
import Header from '../components/header';

export default class NewList extends React.Component{
  render(){
    return (
      <div>
        <Header title={'消息列表'} back={true} search={true}/>
        123
      </div>
    )
  }
}
