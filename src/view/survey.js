import React, {Fragment}from 'react';
import Header from '../components/header';

/**
 * 售电概况
 */

export default class Survey extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data :[
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ]
    }
  }

  componentDidMount(){
  
  }

  render(){
    return(
      <Fragment>
        <Header title={'售电概况'} back={true} search={false}/>
        <div id="c1" className="charts">
	      </div>
     </Fragment>
    )
  }
 
}






 