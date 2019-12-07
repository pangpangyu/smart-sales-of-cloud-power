import React from 'react';
import Header from '../components/header'
/**
 * 客户管理
 */

export default class customer extends React.Component{
  render(){
    return (
      <div style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <Header title={'客户管理'} back={true} search={false}/>
        123
      </div>
    )
  }
}
