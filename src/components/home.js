import React from 'react';
import { Carousel, Grid  } from 'antd-mobile';
// import api from '../api/index';
// import { baseImgUrl } from '../config/index';
import { Link } from 'react-router-dom';
import Header from '../components/header';

/**
 * 首页
 */
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgHeight: 140,
      carouselList: [
        { id:1, url:require('../assets/img/banner.png'), name:'banner' },
        { id:2, url:require('../assets/img/banner.png'), name:'banner' },
        { id:3, url:require('../assets/img/banner.png'), name:'banner' }
      ],
      slideIndex:0,
      menuList:[
        { id:1 ,name:'售电概况',url:require('../assets/img/img001.png'),link:'/survey' },
        { id:2 ,name:'客户管理',url:require('../assets/img/img002.png'),link:'/customer' },
        { id:3 ,name:'合同管理',url:require('../assets/img/img003.png'),link:'/contractManage' },
        { id:4 ,name:'结算管理',url:require('../assets/img/img004.png'),link:'/' },
        { id:5 ,name:'电量跟踪',url:require('../assets/img/img005.png'),link:'/' },
        { id:6 ,name:'经营分析',url:require('../assets/img/img006.png'),link:'/' },
        { id:7 ,name:'考勤管理',url:require('../assets/img/img007.png'),link:'/' },
        { id:8 ,name:'信息发布',url:require('../assets/img/img008.png'),link:'/' },
        { id:9 ,name:'交易中心',url:require('../assets/img/img009.png'),link:'/' },
        { id:10 ,name:'聊一聊',url:require('../assets/img/img010.png'),link:'/' },
        { id:11 ,name:'待办事项',url:require('../assets/img/img011.png'),link:'/todolist' },
        { id:12 ,name:'公司公告',url:require('../assets/img/img012.png'),link:'/newList/1' }
      ]
    }
  }
  componentDidMount(){
    const that = this
    // api.GetHomeCarouselList({}).then(res => {
    //   if(res.status === 0){
		// 		that.setState({
		// 			carouselList:res.data.displayImages
		// 		})
		// 	}
    // })
	}
  render(){
    return(
      <div>
        <Header title={'首页'} back={false} search={false}/>
        <div className="banner">
          {
            (this.state.carouselList && this.state.carouselList.length) && 
            <Carousel
                cellSpacing={8}
                slideWidth={0.8}
                dots={false}
                autoplay
                infinite
                autoplayInterval={3000}
                afterChange={index => this.setState({ slideIndex: index })}
                style={{minHeight:'180px'}}
              >
                {this.state.carouselList.map((item,index) => (
                  <div 
                    className="banner-item"
                    key={index} >
                      <div className="banner-img" style={{transform: this.state.slideIndex === index ? 'scale(1)' : 'scale(0.9)',height:this.state.imgHeight}}>
                        <img src={ item.url } alt={item.name} style={{width:"100%"}}/>
                        {/* baseImgUrl +  */}
                      </div>
                  </div>
                ))}
              </Carousel>
          }
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
              <div className="v-item" key={type}><Link to="/newList/1">{type}</Link></div>
            ))}
          </Carousel>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <Grid data={this.state.menuList}
          columnNum={4}
          hasLine={false}
          renderItem={item => (
            <div style={{padding:'5px 0'}}>
              <Link to={item.link}>
                <img src={item.url} alt="" style={{ width: '50px', height: 'auto' }}/>
                <div style={{fontSize:'12px',color:'#2b2a30',marginTop:'3px'}}>
                  <span>{item.name}</span>
                </div>
              </Link>
            </div>
          )}
        />
      </div>
    )
  }
}

export default Home;
