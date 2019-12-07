import React from 'react';
import { List, Drawer } from 'antd-mobile';
/**
 * 年预计电量
 */

export default class annualEstimatedPower extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      year: '2019',
      pickerList: ['2019','2018','2017','2016'],
      open:false
    }
  }
  openDrawer = () => {
    this.setState({
      open:true
    })
  }


  render(){
    return(
      <div className="annualEstimatedPower">
        <div className="chooes-year">
          <div className="l">选择年份</div>
          <div className="r" onClick={this.openDrawer}>
            {this.state.year}<i className="iconfont iconxiala-copy" style={{fontSize:'10px',color:'#cccccc'}}></i>
          </div>
        </div>
        <div className="power-totle" style={{textAlign:'center',fontSize:'11px',color:'#999999',padding:'30px 0',lineHeight:'18px'}}>
          <p><span style={{fontSize:'16px',color:'#2b2a30',marginRight:'3px'}}>1300</span>兆瓦时</p>
          <p>电量合计</p>
        </div>
        <div className="m-list">
          <ul>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
            <li><p className="p1">1月</p><p className="p2">102</p></li>
          </ul>
        </div>
      </div>
    )
  }
}
