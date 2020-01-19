import React from 'react';
import { Carousel, Grid, Toast  } from 'antd-mobile';
import api from '../api/index';
import { baseImgUrl } from '../config/index';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import { setCookies,getDataQuery } from '../utils/index';
/**
 * 首页
 */
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgHeight: 142,
      carouselList: [],
      newList:[],
      slideIndex:0,
      menuList:[
        { id:1 ,name:'售电概况',url:require('../assets/img/img001.png'),link:'/survey' },
        { id:2 ,name:'客户管理',url:require('../assets/img/img002.png'),link:'/customer' },
        { id:3 ,name:'合同管理',url:require('../assets/img/img003.png'),link:'/contractManage' },
        { id:4 ,name:'结算管理',url:require('../assets/img/img004.png'),link:'/settlementManage' },
        { id:5 ,name:'电量跟踪',url:require('../assets/img/img005.png'),link:'/powerTracking' },
        { id:6 ,name:'经营分析',url:require('../assets/img/img006.png'),link:'/bsinessAnalysis' },
        { id:7 ,name:'考勤管理',url:require('../assets/img/img007.png'),link:'/attendanceList' },
        { id:8 ,name:'信息发布',url:require('../assets/img/img008.png'),link:'/infoDelivey' },
        { id:9 ,name:'交易中心',url:require('../assets/img/img009.png'),link:'/tradingCenter' },
        { id:10 ,name:'聊一聊',url:require('../assets/img/img010.png'),link:'' },//xiaohui://schemas.onecloud.cn/im/conversation
        { id:11 ,name:'待办事项',url:require('../assets/img/img011.png'),link:'/todolist' },
        { id:12 ,name:'公司公告',url:require('../assets/img/img012.png'),link:'/newList/1' }
      ]
    }
  }
  componentDidMount(){
    const that = this
    document.documentElement.scrollTop = document.body.scrollTop =0;
    window.sessionStorage.setItem('active1','1')
		window.sessionStorage.setItem('active2','1')
    if(process.env.NODE_ENV === 'development'){
      setCookies('PLAY_SESSION', '4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
      let userInfo = {
        "positionId": "21",
        "accountName": "APP测试",
        "departmentId": "14",
        "account": "appusr",
        "token": "appusr",
        "userInfoId": "64"
      }
      let systemUser={
        "departmentName":"总经理办公室",
        "positionName":"总经理",
        "systemUserName":"APP测试",
      }
      let info = JSON.stringify(userInfo)
      let info2=JSON.stringify(systemUser)
      window.sessionStorage.setItem('userInfo',info)
      window.sessionStorage.setItem('systemUser',info2)
      window.sessionStorage.setItem('token','4680269fd3b5593ce11fbf08d18bad3128633ee5-account=appusr')
      that.GetHomeCarouselList()
      that.GetNewList()
    }else{
      let companyName = getDataQuery('companyName') || '亦云信息'
      let token = getDataQuery('token') || ''
      let params = {
        companyName:companyName,
        token:token,
        loginType:'xiaohuiApp'
      }
      if(!window.sessionStorage.getItem('userInfo')){
        api.login(params).then(res => {
          if(res.status === 0){
            setCookies('PLAY_SESSION', res.data.token)
            window.sessionStorage.setItem('token',res.data.token)
            let userInfo = {
              "positionId": res.data.positionId || 0,//0,
              "accountName": res.data.accountName || "",//"APP测试",
              "departmentId": res.data.departmentId || "",//"14",
              "account": res.data.account || "",//"appusr",
              "token": res.data.token || "",//"appusr",
              "userInfoId": res.data.userInfoId || "",//"64"
            }
            let info = JSON.stringify(userInfo)
            window.sessionStorage.setItem('userInfo',info)
            this.FindSystemUser(res.data.userInfoId)
            that.GetHomeCarouselList()
            that.GetNewList()
          }else{
            Toast.fail(res.message,0)
          }
        }).catch(e => {
          Toast.fail('存在非法参数，请联系技术人员处理',0)
        })
      }else{
        that.GetHomeCarouselList()
        that.GetNewList()
      }
    }
  }
  GetHomeCarouselList = () => {
    const that = this
    api.GetHomeCarouselList({}).then(res => {
      if(res.status === 0 && res.data.displayImages){
				that.setState({
					carouselList:[...res.data.displayImages,...res.data.displayImages]
				})
			}
    })
  }
  GetNewList = () => {
    const that = this
    let params = {"rowNumber":0,"pageSize":5,"_":new Date().getTime()}
    api.GetNewList(params).then(res => {
      if(res.status === 0){
        that.setState({
          newList:res.data.rows
        })
      }
    })
  }

  gotoxiaohui = () => {
    window.location.href = 'xiaohui://schemas.onecloud.cn/im/conversation'
    // window.location.href = 'http://www.baidu.com'
  }

  FindSystemUser=(id)=>{
    let params={
      id:id
    }
    api.FindSystemUser(params).then(res=>{
      let systemUser={
        "departmentName":res.data.systemUserInfo.position.department.departmentName,
        "positionName":res.data.systemUserInfo.position.positionName,
        "systemUserName":res.data.systemUserInfo.systemUserName,
      }
      let info2=JSON.stringify(systemUser)
      window.sessionStorage.setItem('systemUser',info2)
    })
  }

  render(){
    return(
      <div>
        <Header title={'首页'} back={false} search={false}/>
        <div className="banner" style={{height:'142px',color:'#fff',touchAction: 'none' }}>
          {
            ( this.state.carouselList && this.state.carouselList.length ) && 
            <Carousel
              infinite
              dots={false}
              autoplay
              autoplayInterval={3000}
            >
              {this.state.carouselList.map((item,index) => (
                  <div 
                    className="banner-item"
                    key={index} >
                      <div className="banner-img" style={{height:this.state.imgHeight}}>
                        <img src={ baseImgUrl + item.url } alt={item.name} style={{width:"100%"}}/>
                      </div>
                  </div>
              ))}
            </Carousel>
          }
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div style={{height:'50px',overflow:'hidden'}}>
          { this.state.newList &&  this.state.newList.length > 0 &&
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
                  {this.state.newList.map(item => (
                    <div className="v-item" key={item.id}>
                      <Link to="/newList/2">{item.title}</Link>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          }
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div style={{paddingBottom:'20px'}}>
          <Grid data={this.state.menuList}
            columnNum={4}
            hasLine={false}
            renderItem={item => (
              <div style={{padding:'5px 0'}}>
                { item.link !== '' && <Link to={item.link}>
                                        <img src={item.url} alt="" style={{ width: '50%', height: 'auto' }}/>
                                        <div style={{fontSize:'12px',color:'#2b2a30',marginTop:'3px'}}>
                                          <span>{item.name}</span>
                                        </div>
                                      </Link> }
                { item.link === '' && <a href="xiaohui://schemas.onecloud.cn/im/conversation">
                  <img src={item.url} alt="" style={{ width: '50px', height: 'auto' }}/>
                  <div style={{fontSize:'12px',color:'#2b2a30',marginTop:'3px'}}>
                    <span>{item.name}</span>
                  </div></a>}
              </div>
            )}
          />
        </div>
      </div>
    )
  }
}

export default Home
