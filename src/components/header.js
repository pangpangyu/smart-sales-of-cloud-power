import React from 'react';

export default class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  gotoback = () => {
    window.history.go(-1)
  }

  render(){
    return(
      <div>
        <div className="header">
          <p className="header-title">{ this.props.title || '' }</p>
          { this.props.back && (<div className="header-back" onClick={this.gotoback}><i className="iconfont iconfanhui"></i></div>)}
          { this.props.search && (<div className="header-search"><i className="iconfont iconsousuo"></i></div>)}
        </div>
        <div style={{height:'45px'}}></div>
      </div>
    )
  }
}
