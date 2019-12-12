import React from 'react';
import Header from '../components/header';
import F2 from '@antv/f2/lib/index';
import ScrollBar from '@antv/f2/lib/plugin/scroll-bar';
import Pan from '@antv/f2/lib/interaction/pan';
import _ from 'lodash';
import api from '../api/index'
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
      data5: [],
    }
  }

  componentDidMount(){
    const that = this
    that.getTitleData()
    that.getDataChart1()
    that.getDataChart2()
    that.getDataChart3()
    that.getDataChart4()
    that.getDataChart5()
  }
  //售电情况总览
  getTitleData = () => {
    //const that = this
    let params = {"electricQuantity":48178,"cusCount":12,"earnings":0.01,"year":2019,"contractNum":5}
    api.GetTabControlData(params).then(res => {

    })
  }
  getDataChart1 = () => {
    this.paintingChart1()
  }
  paintingChart1 = () => {
    //const that = this
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
      { name: '合同电量', marker: 'square', fill: '#288dfd' }, 
      { name: '合同收益', marker: function marker(x, y, r, ctx) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.moveTo(x - r - 3, y);
          ctx.lineTo(x + r + 3, y);
          ctx.stroke();
          ctx.arc(x, y, r, 0, Math.PI * 2, false);
          ctx.fill();
        },
        fill: '#f9a30c'
      }
    ];
    function findLegendItem(name) {
      let index;
      for (let i = 0; i < legendItems.length; i++) {
        if (legendItems[i].name === name) {
          index = i;
          break;
        }
      }
      return index;
    }
    const chart = new F2.Chart({
      id: 'myChart3',
      pixelRatio: window.devicePixelRatio,
      padding: [ 'auto', 'auto', 30, 'auto' ]
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
    // chart.axis('avgScore', {
    //   grid: null
    // });
    // chart.axis('name', {
    //   label: {
    //     rotate: Math.PI / 3,
    //     textAlign: 'start',
    //     textBaseline: 'middle'
    //   }
    // });

    // chart.legend({
    //   custom: true,
    //   items: legendItems
    // });
    chart.legend({
      custom: true,
      items: legendItems,
      onClick: function onClick(ev) {
        const item = ev.clickedItem;
        const name = item.get('name');
        const checked = item.get('checked');
        const children = item.get('children');
        if (checked) {
          const markerFill = children[0].attr('fill');
          const textFill = children[1].attr('fill');
          children[0].set('_originColor', markerFill); // 缓存 marker 原来的颜色
          children[1].set('_originColor', textFill); // 缓存文本原来的颜色
        }
        const geoms = chart.get('geoms');
        for (let i = 0; i < geoms.length; i++) {
          const geom = geoms[i];
    
          if (geom.getYScale().alias === name) {
            if (!checked) {
              geom.show();
              children[0].attr('fill', children[0].get('_originColor'));
              children[1].attr('fill', children[1].get('_originColor'));
            } else {
              geom.hide();
              children[0].attr('fill', '#bfbfbf'); // marker 置灰
              children[1].attr('fill', '#bfbfbf'); // 文本置灰 置灰
            }
          }
          item.set('checked', !checked);
          legendItems[findLegendItem(name)].checked = !checked;
        }
      }
    });
    
    // tooltip 和图例的联动
    chart.tooltip({
      showCrosshairs: true,
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        console.log(obj)
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function(item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function(item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(legendItems);
      }
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
    let data = []
    var originDates = []
    // const legendItems = [
    //   { name: '申报电量', marker: 'square', fill: '#288dfd' }, 
    //   { name: '实时电量', marker: 'square', fill: '#f9a30c' }
    // ];
    for(let i=0;i<31;i++){
      data.push({ name: '申报电量', type:'declare', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      data.push({ name: '实时电量', type:'realTime', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      if(i%4===0){
        originDates.push(i+1+'日')
      }
    }
    const chart = new F2.Chart({
      id: 'myChart4',
      pixelRatio: window.devicePixelRatio,
      plugins:[ScrollBar,Pan]
    });
    chart.source(data, {
      title: {
        values: originDates
      },
      num: {
        tickCount: 5
      }
    });
    chart.tooltip({
      alwaysShow: true,
      // showTitle: true,
      // showCrosshairs: true,
      // crosshairsStyle: {
      //   stroke: 'rgba(0, 0, 0, 0.25)',
      //   lineWidth: 2
      // },
      // onChange:function(obj){
      //   console.log(obj)
      // }
      custom: true, // 自定义 tooltip 内容框
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 2
      },
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function(item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function(item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    })
    chart.animate(false)
    chart.interval().position('title*num').color('name',['#288dfd','#f9a30c']).size('9').style({
      radius: [3,3,3,3]
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
    let data = []
    var originDates = []
    for(let i=0;i<31;i++){
      data.push({ name: '申报电量', type:'declare', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      data.push({ name: '实时电量', type:'realTime', title: (i+1)+'日', num: parseInt(Math.random() * 1000) })
      if(i%4===0){
        originDates.push(i+1+'日')
      }
    }
    const chart = new F2.Chart({
      id: 'myChart5',
      pixelRatio: window.devicePixelRatio,
      plugins:[ScrollBar,Pan]
    });
    chart.source(data, {
      title: {
        values: originDates
      },
      num: {
        tickCount: 5
      }
    });
    chart.tooltip({
      alwaysShow: true,
      // showTitle: true,
      // showCrosshairs: true,
      // crosshairsStyle: {
      //   stroke: 'rgba(0, 0, 0, 0.25)',
      //   lineWidth: 2
      // },
      // onChange:function(obj){
      //   console.log(obj)
      // }
      custom: true, // 自定义 tooltip 内容框
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 2
      },
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function(item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function(item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart.line().position('title*num').color('name',['#288dfd','#f9a30c']).adjust('stack');
    chart.point().position('title*num').adjust('stack')
      .style('name', {
        lineWidth: 1,
        fill: '#fff',
        stroke: function stroke(val) {
          if (val === '申报电量') {
            return '#f3ac32';
          } else if (val === '实时电量') {
            return '#b8b8b8';
          }
        }
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






