import React from 'react';
import { Carousel } from 'antd-mobile';
import api from '../api/index';
import { baseUrl } from '../config/index';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      carouselList: []
    }
  }
  componentDidMount(){
    const that = this
    api.findOneInfoByLocation().then(res => {
      if(res.status === 0){
				that.setState({
					carouselList:res.data.displayImages
				})
			}
    })
	}
  render(){
    return(
      <div>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.carouselList.map((item,index) => (
            <div key={index}>
              <img src={ baseUrl + item.url } alt={item.name} style={{width:"100%"}}/>
            </div>
          ))}
        </Carousel>
      </div>
    )
  }
}

export default Home;
