import React from 'react';
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
      ],
      total:[
        { id:1,num:'2000',title:'合同总数' },
        { id:2,num:'2000',title:'合同总数' },
        { id:3,num:'2000',title:'合同总数' },
        { id:4,num:'2000',title:'合同总数' },
        { id:5,num:'2000',title:'合同总数' }
      ]
    }
  }

  componentDidMount(){
  
  }

  render(){
    return(
      <div className="survey-page" style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <Header title={'售电概况'} back={true} search={false}/>
        <div className="top-totls">
          { this.state.total && this.state.total.map(item => {
            return  <div className="item" key={item.id}>
                      <p><span>{ item.num }</span>个</p>
                      <p>{ item.title }</p>
                    </div>
          }) }
        </div>
        <div id="c1" className="charts">
	      </div>
     </div>
    )
  }
 
}






 