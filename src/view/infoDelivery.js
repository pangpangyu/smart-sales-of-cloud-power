import React from 'react';

/**
 * 信息发布 
 * */

export default class InfoDelivery extends React.Component{

  gotoback = () => {
    window.history.go(-1)
  }

  render(){
    return(
      <div className="infoDelivey" style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <div className="header">
          <p className="header-title">信息发布</p>
          <div className="header-back" onClick={this.gotoback}><i className="iconfont iconfanhui"></i></div>
          <div className="header-search"><i className="iconfont iconsousuo"></i></div>
        </div>
        <div style={{height:'45px'}}></div>
        123
      </div>
    )
  }
}
