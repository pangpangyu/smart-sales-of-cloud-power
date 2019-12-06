import React from 'react';
import { Carousel, Grid  } from 'antd-mobile';
// import api from '../api/index';
// import { baseUrl } from '../config/index';
import { Link } from 'react-router-dom';
import Header from '../components/header';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      carouselList: [],
      slideIndex:0,
      menuList:[
        { id:1,name:'',url:'' }
      ]
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
      <div>
        <Header title={'首页'} back={true} search={true}/>
        <div className="banner">
          <Carousel
            autoplay={false}
            infinite
            cellSpacing={8}
            slideWidth={0.8}
            dots={false}
            afterChange={index => this.setState({ slideIndex: index })}
            style={{height:'180px'}}
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
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="new-abstract">
          <i className="iconfont iconxiaoxi"></i>
          <div className="new-abstract">
          <Carousel className="my-carousel"
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
            autoplayInterval={3000}
            resetAutoplay={false}
          >
            {['ringringringringringringringringringringringringringringringringringringringring', 'ruby', 'iPhone', 'iPod', 'sorry', 'tourism', 'coke', 'ticket', 'note'].map(type => (
              <div className="v-item" key={type}><Link to="/newList">{type}</Link></div>
            ))}
          </Carousel>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        {/* <Grid data={data1}
          columnNum={4}
          renderItem={dataItem => (
            <div style={{ padding: '12.5px' }}>
              <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
              <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                <span>I am title..</span>
              </div>
            </div>
          )}
        /> */}
      </div>
    )
  }
}

export default Home;
