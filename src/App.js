import React from 'react';
import './App.less';

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
