import React from 'react';
import Header from '../components/header';
import F2 from '@antv/f2'
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
        { id:1,num:'2000',title:'合同总数', bg:'#3778f5' },
        { id:2,num:'2000',title:'合同总数', bg:'#288dfd' },
        { id:3,num:'2000',title:'合同总数', bg:'#3aaafb' },
        { id:4,num:'2000',title:'合同总数', bg:'#4fcdfd' }
      ],
      data1: [{
        name: '1月',
        percent: 0.4,
        a: '1'
      }, {
        name: '2月',
        percent: 0.2,
        a: '1'
      }, {
        name: '3月',
        percent: 0.18,
        a: '1'
      }, {
        name: '4月',
        percent: 0.15,
        a: '1'
      }, {
        name: '5月',
        percent: 0.05,
        a: '1'
      }, {
        name: '6月',
        percent: 0.02,
        a: '1'
      }, {
        name: '7月',
        percent: 0.02,
        a: '1'
      }, {
        name: '8月',
        percent: 0.02,
        a: '1'
      }, {
        name: '9月',
        percent: 0.02,
        a: '1'
      }, {
        name: '10月',
        percent: 0.02,
        a: '1'
      }, {
        name: '11月',
        percent: 0.02,
        a: '1'
      }, {
        name: '12月',
        percent: 0.02,
        a: '1'
      }]
    }
  }

  componentDidMount(){
    const map = {
      '1月': '40%',
      '2月': '20%',
      '3月': '18%',
      '4月': '15%',
      '5月': '5%',
      '6月': '2%',
      '7月': '40%',
      '8月': '20%',
      '9月': '18%',
      '10月': '15%',
      '11月': '5%',
      '12月': '2%',
    };
    const chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio, // 指定分辨率
    });
    chart.source(this.state.data1,{
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'left',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.7,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval()
      .position('a*percent')
      .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      });
    chart.guide();
    chart.render();
  }

  render(){
    
    return(
      <div className="survey-page" style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <Header title={'售电概况'} back={true} search={false}/>
        <div className="top-totls">
          { this.state.total && this.state.total.map(item => {
            return  <div className="item" key={item.id} style={{background:item.bg}}>
                      <p><span style={{fontSize:'19px'}}>{ item.num }</span>个</p>
                      <p style={{paddingTop:'10px'}}>{ item.title }</p>
                    </div>
          }) }
        </div>
        <div style={{height:'10px',color:'#f0f1f3'}}></div>
        <div className="charts-map">
          <div className="title">
            <i className="iconfont iconhetong"></i>合同数量（2019年）
          </div>
          <div className="chear-view">
            <canvas id="myChart" width="345" height="130"></canvas>
          </div>
        </div>
        <div id="c1" className="charts">
	      </div>
     </div>
    )
  }
 
}






 