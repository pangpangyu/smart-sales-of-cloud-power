import React from 'react';
import './assets/css/app.less';
import './assets/css/iconfont/css';

class App extends React.Component{
  render(){
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default App;
