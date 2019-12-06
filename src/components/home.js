import React from 'react';
import { Carousel } from 'antd-mobile';
import api from '../api/index';
import { baseUrl } from '../config/index';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      carouselList: [],
      slideIndex:0
    }
  }
  componentDidMount(){
    const that = this
    // api.findOneInfoByLocation().then(res => {
    //   if(res.status === 0){
		// 		that.setState({
		// 			carouselList:res.data.displayImages
		// 		})
		// 	}
    // })
    let arr = [
      {url:require('../assets/img/banner.png'),name:'banner'},
      {url:require('../assets/img/banner.png'),name:'banner'},
      {url:require('../assets/img/banner.png'),name:'banner'}
    ]
    that.setState({
      carouselList:arr
    })
	}
  render(){
    return(
      <div className="banner">
        <Carousel
          autoplay={false}
          infinite
          cellSpacing={8}
          slideWidth={0.8}
          dots={false}
          afterChange={index => this.setState({ slideIndex: index })}
          style={{padding:'20px 0',overflow:'inherit'}}
        >
          {this.state.carouselList.map((item,index) => (
            <div 
              className="banner-item"
              key={index} >
                <div className="banner-img" style={{transform: this.state.slideIndex === index ? 'scale(1)' : 'scale(0.9)',}}>
                  <img src={ item.url } alt={item.name} style={{width:"100%"}}/>
                </div>
              {/* baseUrl +  */}
            </div>
          ))}
        </Carousel>
      </div>
    )
  }
}

export default Home;
