import React from 'react';
import Header from '../components/header';
import F2 from '@antv/f2/lib/index';
import ScrollBar from '@antv/f2/lib/plugin/scroll-bar';
import Pan from '@antv/f2/lib/interaction/pan';

/**
 * 售电概况
 */

class Survey extends React.Component {
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
        { id:1,num:'200',title:'合同总数', bg:'#3778f5', unit: '个' },
        { id:2,num:'25100',title:'合同电量', bg:'#288dfd', unit: '兆瓦时' },
        { id:3,num:'200',title:'合同收益', bg:'#3aaafb', unit: '万元' },
        { id:4,num:'2000',title:'合同总数', bg:'#4fcdfd', unit: '个' }
      ],
      data1: [
        { name: '1月', percent: 0.4, a: '1' }, 
        { name: '2月', percent: 0.2, a: '1' }, 
        { name: '3月', percent: 0.18, a: '1' }, 
        { name: '4月', percent: 0.15, a: '1' }, 
        { name: '5月', percent: 0.05, a: '1' }, 
        { name: '6月', percent: 0.02, a: '1' }, 
        { name: '7月', percent: 0.02, a: '1' }, 
        { name: '8月', percent: 0.02, a: '1' }, 
        { name: '9月', percent: 0.02, a: '1' }, 
        { name: '10月', percent: 0.02, a: '1' }, 
        { name: '11月', percent: 0.02, a: '1' }, 
        { name: '12月', percent: 0.02, a: '1' }
      ],
      data2:[
        { year: '2017', sales: 90 },
        { year: '2018', sales: 103 }, 
        { year: '2019', sales: 124 },
      ],
      data3: [
        { name: '1月', score: 282, avgScore: 94 }, 
        { name: '2月', score: 208, avgScore: 41.6 }, 
        { name: '3月', score: 186, avgScore: 46.5 }, 
        { name: '4月', score: 184, avgScore: 30.67 }, 
        { name: '5月', score: 177, avgScore: 44.25 }, 
        { name: '6月', score: 150, avgScore: 50 }, 
        { name: '7月', score: 148, avgScore: 24.67 }, 
        { name: '8月', score: 138, avgScore: 34.5 }, 
        { name: '9月', score: 130, avgScore: 32.5 }, 
        { name: '10月', score: 128, avgScore: 32 }, 
        { name: '11月', score: 127, avgScore: 62.5 },
        { name: '12月', score: 127, avgScore: 62.5 }
      ],
      data4: [
        { type:'declare', title: '1日', num: 900 },
        { type:'realTime', title: '1日', num: 900 },
        { type:'declare', title: '2日', num: 900 },
        { type:'realTime', title: '2日', num: 900 },
      ],
      data5: [
        {"date":"2010-01-10","type":"日前均价","value":99.9},
        {"date":"2010-01-10","type":"实时均价","value":96.2},
        {"date":"2010-02-10","type":"日前均价","value":96.7},
        {"date":"2010-02-10","type":"实时均价","value":93.4},
        {"date":"2010-03-10","type":"日前均价","value":100.2},
        {"date":"2010-03-10","type":"实时均价","value":91.7},
        {"date":"2010-04-10","type":"日前均价","value":104.7},
        {"date":"2010-04-10","type":"实时均价","value":93.1},
        {"date":"2010-05-10","type":"日前均价","value":95.6},
        {"date":"2010-05-10","type":"实时均价","value":92.3},
        {"date":"2010-06-10","type":"日前均价","value":95.6},
        {"date":"2010-06-10","type":"实时均价","value":92.5},
        {"date":"2010-07-10","type":"日前均价","value":95.3},
        {"date":"2010-07-10","type":"实时均价","value":95.7},
        {"date":"2010-08-10","type":"日前均价","value":96.1},
        {"date":"2010-08-10","type":"实时均价","value":99.9},
        {"date":"2010-09-10","type":"日前均价","value":96.1},
        {"date":"2010-09-10","type":"实时均价","value":103.8},
        {"date":"2010-10-10","type":"日前均价","value":101.6},
        {"date":"2010-10-10","type":"实时均价","value":108.9},
        {"date":"2010-11-10","type":"日前均价","value":105.6},
        {"date":"2010-11-10","type":"实时均价","value":113.7},
        {"date":"2010-12-10","type":"日前均价","value":112.7},
        {"date":"2010-12-10","type":"实时均价","value":118.8},
        {"date":"2011-01-11","type":"日前均价","value":117},
        {"date":"2011-01-11","type":"实时均价","value":124.3},
        {"date":"2011-02-11","type":"日前均价","value":121.8},
        {"date":"2011-02-11","type":"实时均价","value":130.1},
        {"date":"2011-03-11","type":"日前均价","value":133.1},
        {"date":"2011-03-11","type":"实时均价","value":125.8},
        {"date":"2011-04-11","type":"日前均价","value":141.9},
        {"date":"2011-04-11","type":"实时均价","value":127.4},
        {"date":"2011-05-11","type":"日前均价","value":133.1},
        {"date":"2011-05-11","type":"实时均价","value":123.9},
        {"date":"2011-06-11","type":"日前均价","value":131.2},
        {"date":"2011-06-11","type":"实时均价","value":123.2},
        {"date":"2011-07-11","type":"日前均价","value":133.7},
        {"date":"2011-07-11","type":"实时均价","value":122.6},
        {"date":"2011-08-11","type":"日前均价","value":125.2},
        {"date":"2011-08-11","type":"实时均价","value":123.2},
        {"date":"2011-09-11","type":"日前均价","value":125.5},
        {"date":"2011-09-11","type":"实时均价","value":121.6},
        {"date":"2011-10-11","type":"日前均价","value":124.2},
        {"date":"2011-10-11","type":"实时均价","value":115.6},
        {"date":"2011-11-11","type":"日前均价","value":129.4},
        {"date":"2011-11-11","type":"实时均价","value":112.2},
        {"date":"2011-12-11","type":"日前均价","value":128},
        {"date":"2011-12-11","type":"实时均价","value":109.1},
        {"date":"2012-01-12","type":"日前均价","value":130.6},
        {"date":"2012-01-12","type":"实时均价","value":111},
        {"date":"2012-02-12","type":"日前均价","value":136.2},
        {"date":"2012-02-12","type":"实时均价","value":113.4},
        {"date":"2012-03-12","type":"日前均价","value":141.2},
        {"date":"2012-03-12","type":"实时均价","value":114.6},
        {"date":"2012-04-12","type":"日前均价","value":136.1},
        {"date":"2012-04-12","type":"实时均价","value":114.8},
        {"date":"2012-05-12","type":"日前均价","value":126.3},
        {"date":"2012-05-12","type":"实时均价","value":113.1},
        {"date":"2012-06-12","type":"日前均价","value":111.5},
        {"date":"2012-06-12","type":"实时均价","value":110.7},
        {"date":"2012-07-12","type":"日前均价","value":118.6},
        {"date":"2012-07-12","type":"实时均价","value":118.7},
        {"date":"2012-08-12","type":"日前均价","value":127.7},
        {"date":"2012-08-12","type":"实时均价","value":118.6},
        {"date":"2012-09-12","type":"日前均价","value":128.5},
        {"date":"2012-09-12","type":"实时均价","value":118.5},
        {"date":"2012-10-12","type":"日前均价","value":125.9},
        {"date":"2012-10-12","type":"实时均价","value":115.2},
        {"date":"2012-11-12","type":"日前均价","value":124.1},
        {"date":"2012-11-12","type":"实时均价","value":113},
        {"date":"2012-12-12","type":"日前均价","value":124.2},
        {"date":"2012-12-12","type":"实时均价","value":112.4},
        {"date":"2013-01-13","type":"日前均价","value":128.4},
        {"date":"2013-01-13","type":"实时均价","value":111.5},
        {"date":"2013-02-13","type":"日前均价","value":131.2},
        {"date":"2013-02-13","type":"实时均价","value":110.4},
        {"date":"2013-03-13","type":"日前均价","value":126.2},
        {"date":"2013-03-13","type":"实时均价","value":108.4},
        {"date":"2013-04-13","type":"日前均价","value":123.1},
        {"date":"2013-04-13","type":"实时均价","value":106},
        {"date":"2013-05-13","type":"日前均价","value":123.2},
        {"date":"2013-05-13","type":"实时均价","value":108.1},
        {"date":"2013-06-13","type":"日前均价","value":122.9},
        {"date":"2013-06-13","type":"实时均价","value":107.7},
        {"date":"2013-07-13","type":"日前均价","value":128.1},
        {"date":"2013-07-13","type":"实时均价","value":105.6},
        {"date":"2013-08-13","type":"日前均价","value":130.9},
        {"date":"2013-08-13","type":"实时均价","value":103.8},
        {"date":"2013-09-13","type":"日前均价","value":131.6},
        {"date":"2013-09-13","type":"实时均价","value":103.6},
        {"date":"2013-10-13","type":"日前均价","value":128.3},
        {"date":"2013-10-13","type":"实时均价","value":104},
        {"date":"2013-11-13","type":"日前均价","value":125.4},
        {"date":"2013-11-13","type":"实时均价","value":103.3},
        {"date":"2013-12-13","type":"日前均价","value":129.5},
        {"date":"2013-12-13","type":"实时均价","value":103.4},
      ]
    }
  }

  componentDidMount(){
    const that = this
    that.getDataChart1()
    that.getDataChart2()
    that.getDataChart3()
    that.getDataChart4()
    that.getDataChart5()
  }

  getDataChart1 = () => {
    this.paintingChart1()
  }
  paintingChart1 = () => {
    const that = this
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
      id: 'myChart1',
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

  getDataChart2 = () => {
    this.paintingChart2()
  }
  paintingChart2 = () => {
    const chart = new F2.Chart({
      id: 'myChart2',
      padding: [15, 15, 35, 40],
      pixelRatio: window.devicePixelRatio
    });
    
    chart.source(this.state.data2, {
      sales: {
        tickCount: 5
      }
    });
    chart.coord({
      transposed: true
    });
    chart.tooltip(false);
    chart.interval().position('year*sales').shape('circle').size('9').style({
      radius: [ 4, 4, 4, 4 ]
    });
    chart.render();

    const offset = 8;
    const canvas = chart.get("canvas");
    const group = canvas.addGroup();
    const shapes = {};
    this.state.data2.map(item => {
      const point = chart.getPosition(item)
      const text = group.addShape("text", {
        attrs: {
          x: point.x + 16,
          y: point.y + offset,
          text: item.sales,
          textAlign: "center",
          textBaseline: "bottom",
          fill: "#666666"
        }
      })
      shapes[item.year] = text;
    })
  }

  getDataChart3 = () => {
    this.paintingChart3()
  }
  paintingChart3 = () => { 
    const legendItems = [
      { name: '合同电量', marker: 'square', fill: '#288dfd', checked: true, textAlign: "center" }, 
      { name: '合同收益', marker: function marker(x, y, r, ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.fill();
      },
      fill: '#f9a30c',
      checked: true, 
      textAlign: "center"
    }];

    const chart = new F2.Chart({
      id: 'myChart3',
      pixelRatio: window.devicePixelRatio,
      padding: [ 'auto', 'auto', 90, 'auto' ]
    });

    chart.source(this.state.data3, {
      score: {
        tickInterval: 50,
        alias: '合同电量'
      },
      avgScore: {
        ticks: [ 0, 17, 33, 50, 67, 83, 100 ],
        alias: '合同收益'
      }
    });
    chart.axis('avgScore', {
      grid: null
    });
    chart.axis('name', {
      label: {
        rotate: Math.PI / 3,
        textAlign: 'start',
        textBaseline: 'middle'
      }
    });

    chart.legend({
      custom: true,
      items: legendItems
    });

    chart.interval().position('name*score').color('#288dfd').style({
      radius: [ 5, 5, 5, 5 ]
    });
    chart.line().position('name*avgScore').color('#f9a30d');
    chart.point().position('name*avgScore').size(3)
    .style({
      fill: '#fff',
      stroke: '#f9a30c',
      lineWidth: 1
    });
    chart.render();
  }

  getDataChart4 = () => {
    this.paintingChart4()
  }
  paintingChart4 = () => {
    //let data = this.state.data4
    let data = []
    // var originDates = ['1日','5日','10日','15日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
    var originDates = []
    for(let i=0;i<31;i++){
      data.push({ name: '申报电量', type:'declare', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      data.push({ name: '实时电量', type:'realTime', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      if(i%3===0){
        originDates.push(i+1+'日')
      }
    }
    // console.log(data)
    console.log(originDates)
    const chart = new F2.Chart({
      id: 'myChart4',
      pixelRatio: window.devicePixelRatio,
      // width:data.length * 18,
      plugins:[ScrollBar,Pan]
    });
    chart.source(data, {
      title: {
        // type: 'timeCat',
        // tickCount: 1,
        values: originDates
      },
      num: {
        tickCount: 5
      }
    });
    chart.tooltip(false);
    chart.interval().position('title*num').color('name',['#288dfd','#f9a30c']).style({
      radius: [4,4,4,4]
    }).adjust({
      type: 'dodge',
      marginRatio: 0.05 // 设置分组间柱子的间距
    });
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        backgroundColor: '#e8e8e8',
        fillerColor: '#808080',
        offsetY: -2
      }
    });
    chart.interaction('pan');
    chart.render();
  }

  getDataChart5 = () => {
    this.paintingChart5()
  }
  paintingChart5 = () => {
    let data = this.state.data5
    const chart = new F2.Chart({
      id: 'myChart5',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale('date', {
      type: 'timeCat',
      tickCount: 3
    });
    chart.scale('value', {
      tickCount: 5
    });
    chart.axis('date', {
      label: function label(text, index, total) {
        // 只显示每一年的第一天
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip(false);
    chart.line().position('date*value').color('type');
    chart.render();
  }
  
  render(){
    
    return(
      <div className="survey-page" style={{minHeight:'100vh',background:'#f0f1f3'}}>
        <Header title={'售电概况'} back={true} search={false}/>
        <div className="top-totls">
          { this.state.total && this.state.total.map(item => {
            return  <div className="item" key={item.id} style={{background:item.bg}}>
                      <p><span style={{fontSize:'19px'}}>{ item.num }</span>{ item.unit }</p>
                      <p style={{paddingTop:'10px'}}>{ item.title }</p>
                    </div>
          }) }
        </div>
        <div style={{height:'10px',color:'#f0f1f3'}}></div>
        <div className="charts-map">
          <div className="title" style={{borderBottom:'1px solid #eeeeee'}}>
            <i className="iconfont iconhetong"></i>合同数量（2019年）
          </div>
          <div className="chear-view">
            <div style={{fontSize:'12px',color:'#2b2a30',marginTop:'20px'}}>各月份合同数据</div>
            <canvas id="myChart1" width="345" height="130"></canvas>
            <div style={{fontSize:'12px',color:'#2b2a30'}}>近三年合同数量</div>
            <canvas id="myChart2" width="345" height="120"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="charts-map">
          <div className="title" style={{borderBottom:'1px solid #eeeeee'}}>
            <i className="iconfont iconjiage"></i>中长期合同收益（2019年）
          </div>
          <div className="chear-view">
            <canvas id="myChart3" width="345" height="230"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="charts-map">
          <div className="title" style={{borderBottom:'1px solid #eeeeee'}}>
            <i className="iconfont icondianliang"></i>现货电量（2019年11月）
          </div>
          <div className="chear-view" style={{paddingBottom:'10px'}}>
            <canvas id="myChart4" width="345" height="230"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="charts-map">
          <div className="title" style={{borderBottom:'1px solid #eeeeee'}}>
            <i className="iconfont iconshouyi"></i>现货价格（2019年）
          </div>
          <div className="chear-view">
            <canvas id="myChart5" width="345" height="230"></canvas>
          </div>
        </div>
     </div>
    )
  }

}

export default Survey;






