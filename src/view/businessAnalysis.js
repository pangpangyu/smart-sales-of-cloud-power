import React from 'react'
import Header from '../components/header';
import F2 from '@antv/f2/lib/index';
import _ from 'lodash';
/**
 * 经营分析
 */

export default class BsinessAnalysis extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data1: [
        { name: '交易电量', 月份: '1月', value: 18.9 }, 
        { name: '交易电量', 月份: '2月', value: 28.8 }, 
        { name: '交易电量', 月份: '3月', value: 39.3 }, 
        { name: '交易电量', 月份: '4月', value: 81.4 }, 
        { name: '交易电量', 月份: '5月', value: 47 }, 
        { name: '交易电量', 月份: '6月', value: 20.3 }, 
        { name: '交易电量', 月份: '7月', value: 24 }, 
        { name: '交易电量', 月份: '8月', value: 35.6 }, 
        { name: '交易电量', 月份: '9月', value: 47 }, 
        { name: '交易电量', 月份: '10月', value: 20.3 }, 
        { name: '交易电量', 月份: '11月', value: 24 }, 
        { name: '交易电量', 月份: '12月', value: 35.6 }, 
        { name: '实际用电量', 月份: '1月', value: 12.4 }, 
        { name: '实际用电量', 月份: '2月', value: 23.2 }, 
        { name: '实际用电量', 月份: '3月', value: 34.5 }, 
        { name: '实际用电量', 月份: '4月', value: 99.7 }, 
        { name: '实际用电量', 月份: '5月', value: 52.6 }, 
        { name: '实际用电量', 月份: '6月', value: 35.5 }, 
        { name: '实际用电量', 月份: '7月', value: 37.4 }, 
        { name: '实际用电量', 月份: '8月', value: 42.4 },
        { name: '实际用电量', 月份: '9月', value: 52.6 }, 
        { name: '实际用电量', 月份: '10月', value: 35.5 }, 
        { name: '实际用电量', 月份: '11月', value: 37.4 }, 
        { name: '实际用电量', 月份: '12月', value: 42.4 }
      ],
      data2: [
        { name: '年度双边', 月份: '1月', value: 18.9 }, 
        { name: '年度双边', 月份: '2月', value: 28.8 }, 
        { name: '年度双边', 月份: '3月', value: 39.3 }, 
        { name: '年度双边', 月份: '4月', value: 81.4 }, 
        { name: '年度双边', 月份: '5月', value: 47 }, 
        { name: '年度双边', 月份: '6月', value: 20.3 }, 
        { name: '年度双边', 月份: '7月', value: 24 }, 
        { name: '年度双边', 月份: '8月', value: 35.6 }, 
        { name: '年度双边', 月份: '9月', value: 47 }, 
        { name: '年度双边', 月份: '10月', value: 20.3 }, 
        { name: '年度双边', 月份: '11月', value: 24 }, 
        { name: '年度双边', 月份: '12月', value: 35.6 }, 
        { name: '月度双边', 月份: '1月', value: 12.4 }, 
        { name: '月度双边', 月份: '2月', value: 23.2 }, 
        { name: '月度双边', 月份: '3月', value: 34.5 }, 
        { name: '月度双边', 月份: '4月', value: 99.7 }, 
        { name: '月度双边', 月份: '5月', value: 52.6 }, 
        { name: '月度双边', 月份: '6月', value: 35.5 }, 
        { name: '月度双边', 月份: '7月', value: 37.4 }, 
        { name: '月度双边', 月份: '8月', value: 42.4 },
        { name: '月度双边', 月份: '9月', value: 52.6 }, 
        { name: '月度双边', 月份: '10月', value: 35.5 }, 
        { name: '月度双边', 月份: '11月', value: 37.4 }, 
        { name: '月度双边', 月份: '12月', value: 42.4 },
        { name: '合同转让', 月份: '1月', value: 18.9 }, 
        { name: '合同转让', 月份: '2月', value: 28.8 }, 
        { name: '合同转让', 月份: '3月', value: 39.3 }, 
        { name: '合同转让', 月份: '4月', value: 81.4 }, 
        { name: '合同转让', 月份: '5月', value: 47 }, 
        { name: '合同转让', 月份: '6月', value: 20.3 }, 
        { name: '合同转让', 月份: '7月', value: 24 }, 
        { name: '合同转让', 月份: '8月', value: 35.6 }, 
        { name: '合同转让', 月份: '9月', value: 47 }, 
        { name: '合同转让', 月份: '10月', value: 20.3 }, 
        { name: '合同转让', 月份: '11月', value: 24 }, 
        { name: '合同转让', 月份: '12月', value: 35.6 }, 
        { name: '现货交易', 月份: '1月', value: 12.4 }, 
        { name: '现货交易', 月份: '2月', value: 23.2 }, 
        { name: '现货交易', 月份: '3月', value: 34.5 }, 
        { name: '现货交易', 月份: '4月', value: 99.7 }, 
        { name: '现货交易', 月份: '5月', value: 52.6 }, 
        { name: '现货交易', 月份: '6月', value: 35.5 }, 
        { name: '现货交易', 月份: '7月', value: 37.4 }, 
        { name: '现货交易', 月份: '8月', value: 42.4 },
        { name: '现货交易', 月份: '9月', value: 52.6 }, 
        { name: '现货交易', 月份: '10月', value: 35.5 }, 
        { name: '现货交易', 月份: '11月', value: 37.4 }, 
        { name: '现货交易', 月份: '12月', value: 42.4 }
      ],
      data3: [
        { name: '1月', score: 282, avgScore: 94, checked:false }, 
        { name: '2月', score: 208, avgScore: 41.6, checked:false }, 
        { name: '3月', score: 186, avgScore: 46.5, checked:false }, 
        { name: '4月', score: 184, avgScore: 30.67, checked:false }, 
        { name: '5月', score: -177, avgScore: -44.25, checked:false }, 
        { name: '6月', score: 150, avgScore: 50, checked:false }, 
        { name: '7月', score: 148, avgScore: 24.67, checked:false }, 
        { name: '8月', score: 138, avgScore: 34.5, checked:false }, 
        { name: '9月', score: 130, avgScore: 32.5, checked:false }, 
        { name: '10月', score: -128, avgScore: -32, checked:false }, 
        { name: '11月', score: 127, avgScore: 62.5, checked:false },
        { name: '12月', score: 127, avgScore: 62.5, checked:false }
      ],
      data4: [
        { name: '售电成本', 月份: '1月', value: 18.9 }, 
        { name: '售电成本', 月份: '2月', value: 28.8 }, 
        { name: '售电成本', 月份: '3月', value: 39.3 }, 
        { name: '售电成本', 月份: '4月', value: 81.4 }, 
        { name: '售电成本', 月份: '5月', value: 47 }, 
        { name: '售电成本', 月份: '6月', value: 20.3 }, 
        { name: '售电成本', 月份: '7月', value: 24 }, 
        { name: '售电成本', 月份: '8月', value: 35.6 }, 
        { name: '售电成本', 月份: '9月', value: 47 }, 
        { name: '售电成本', 月份: '10月', value: 20.3 }, 
        { name: '售电成本', 月份: '11月', value: 24 }, 
        { name: '购电成本', 月份: '12月', value: 35.6 }, 
        { name: '购电成本', 月份: '1月', value: 12.4 }, 
        { name: '购电成本', 月份: '2月', value: 23.2 }, 
        { name: '购电成本', 月份: '3月', value: 34.5 }, 
        { name: '购电成本', 月份: '4月', value: 99.7 }, 
        { name: '购电成本', 月份: '5月', value: 52.6 }, 
        { name: '购电成本', 月份: '6月', value: 35.5 }, 
        { name: '购电成本', 月份: '7月', value: 37.4 }, 
        { name: '购电成本', 月份: '8月', value: 42.4 },
        { name: '购电成本', 月份: '9月', value: 52.6 }, 
        { name: '购电成本', 月份: '10月', value: 35.5 }, 
        { name: '购电成本', 月份: '11月', value: 37.4 }, 
        { name: '购电成本', 月份: '12月', value: 42.4 },
        { name: '成本差', 月份: '1月', value: 18.9 }, 
        { name: '成本差', 月份: '2月', value: 28.8 }, 
        { name: '成本差', 月份: '3月', value: 39.3 }, 
        { name: '成本差', 月份: '4月', value: 81.4 }, 
        { name: '成本差', 月份: '5月', value: 47 }, 
        { name: '成本差', 月份: '6月', value: 20.3 }, 
        { name: '成本差', 月份: '7月', value: 24 }, 
        { name: '成本差', 月份: '8月', value: 35.6 }, 
        { name: '成本差', 月份: '9月', value: 47 }, 
        { name: '成本差', 月份: '10月', value: 20.3 }, 
        { name: '成本差', 月份: '11月', value: 24 }, 
        { name: '成本差', 月份: '12月', value: 35.6 }
      ],
    }
  }

  componentDidMount(){
    this.getChatMapData1()
    this.getChatMapData2()
    this.getChatMapData3()
    this.getChatMapData4()
    this.paintingMap5()
  }

  getChatMapData1 = () => {
    this.paintingMap1()
  }
  paintingMap1 = () => {
    const chart = new F2.Chart({
      id: 'myChart1',
      pixelRatio: window.devicePixelRatio,
      padding:['auto',0,'auto','auto']
    });
    chart.source(this.state.data1);
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
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
    
    chart.interval()
      .position('月份*value')
      .color('name',['#288dfd','#f9a30c']).style({
        radius:[2,2,2,2]
      })
      .adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
    chart.render();
  }

  getChatMapData2 = () => {
    this.paintingMap2()
  }
  paintingMap2 = () => {
    const chart = new F2.Chart({
      id: 'myChart2',
      pixelRatio: window.devicePixelRatio,
      padding:['auto',0,'auto','auto']
    });
    chart.source(this.state.data2);
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
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
    
    chart.interval()
      .position('月份*value')
      .color('name',['#288dfd','#f9a30c','#6dcfce','#ddc275']).style({
        radius:[2,2,2,2]
      })
      .adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
    chart.render();
  }

  getChatMapData3 = () => {
    this.paintingMap3()
  }
  paintingMap3 = () => {
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

  getChatMapData4 = () => {
    this.paintingMap4()
  }
  paintingMap4 =() => {
    const chart = new F2.Chart({
      id: 'myChart4',
      pixelRatio: window.devicePixelRatio,
      padding:['auto',0,'auto','auto']
    });
    chart.source(this.state.data4);
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
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
    
    chart.interval()
      .position('月份*value')
      .color('name',['#288dfd','#f9a30c','#6dcfce','#ddc275']).style({
        radius:[2,2,2,2]
      })
      .adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
    chart.render();
  }

  getChatMapData5 = () => {
    this.paintingMap4()
  }
  paintingMap5 =() => {
    const chart = new F2.Chart({
      id: 'myChart5',
      pixelRatio: window.devicePixelRatio,
      padding:['auto',0,'auto','auto']
    });
    chart.source(this.state.data4);
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
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
    
    chart.interval()
      .position('月份*value')
      .color('name',['#288dfd','#f9a30c','#6dcfce','#ddc275']).style({
        radius:[2,2,2,2]
      })
      .adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
    chart.render();
  }

  render(){
    return(
      <div style={{minHeight:'100vh',background:'#fff'}} className="bsiness-analysis">
        <Header title={'经营分析'} back={true}/>
        <div className="time-chooes">
          <div className="l">选择时间</div>
          <div className="r">2019<i className="iconfont iconxiala1"></i></div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t"><i className="iconfont icondianliang"></i>电量对比分析</div>
          <div className="f2-map-view">
            <canvas id="myChart1" width="345" height="220"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t"><i className="iconfont iconjiaoyizhongxin"></i>交易电量分析</div>
          <div className="f2-map-view">
            <canvas id="myChart2" width="345" height="220"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t"><i className="iconfont iconjingyingfenxix"></i>偏差电量分析</div>
          <div className="f2-map-view">
            <canvas id="myChart3" width="345" height="220"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t"><i className="iconfont iconjiage"></i>购电成本分析</div>
          <div className="f2-map-view">
            <canvas id="myChart4" width="345" height="220"></canvas>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t"><i className="iconfont iconshouyi"></i>收益分析</div>
          <div className="f2-map-view">
            <canvas id="myChart5" width="345" height="220"></canvas>
          </div>
        </div>
      </div>
    )
  }
}
