import React from 'react';

export default class Header extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <div className="header">
          { this.props.title || '' }
          { this.props.back && (<div className="back"><i className="iconfont "></i></div>)}
        </div>
        <div style={{height:'45px'}}></div>
      </div>
    )
  }
}
