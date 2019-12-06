import React from 'react';
import { TabBar } from 'antd-mobile';
import Home from '../components/home';

class Index extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
			fullScreen: true
    };
	}

	componentDidMount(){
		
	}
	
  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100vh', width: '100%', top: 0, background: '#fff' } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: "url(" + require('../assets/img/img013.png') + ") center center /  21px 19px no-repeat"}}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: "url(" + require('../assets/img/img013.png') + ") center center /  21px 19px no-repeat"}}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
						<Home />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img014.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img014.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            title="云块"
            key="yunkuai"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            第二个页面组件
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img015.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img015.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            title="赞品"
            key="good"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            第三个页面组件
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img016.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: "url(" + require('../assets/img/img016.png') + ") center center /  21px 19px no-repeat"}}
              />
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            第四个页面组件
          </TabBar.Item>
        </TabBar>
      </div>
		);
	}
	// render(){
	// 	return(
	// 		<div>123</div>
	// 	)
	// }
}

export default Index;
