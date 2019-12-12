import React from 'react';
import './assets/css/app.less';
import { setCookies } from './utils/index';
import { Provider } from 'react-keep-alive';

class App extends React.Component{
  componentDidMount(){
    setCookies('PLAY_SESSION','4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
  }
  render(){
    return (
      <Provider>
        { this.props.children }
      </Provider>
    )
  }
}

export default App;
