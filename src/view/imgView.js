import React from 'react';
import { getDataQuery } from '../utils/index';

export default class ImaView extends React.Component{
  constructor(props){
    super(props)
    let url = getDataQuery('url')
    this.state = {
      url:url
    }
  }
  render(){
    return(
      <div><img src={this.state.url} alt=""/></div>
    )
  }
}
