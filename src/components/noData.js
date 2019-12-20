import React from 'react';

export default class NoData extends React.Component{
  render(){
    return (
      <div className="no-data" style={{textAlign:'center',padding:'30px 0',background:'#fff'}}>
        <img src={ require('../assets/img/nodata.png') } style={{width:'96px'}} alt="暂无数据"/>
        <p style={{fontSize:'15px',color:'#999999',padding:'12px 0'}}>暂无数据哦</p>
      </div>
    )
  }
}
