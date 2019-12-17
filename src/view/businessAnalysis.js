import React from 'react'
import Header from '../components/header';
import echarts from 'echarts';
import api from '../api/index';
/**
 * 经营分析
 */

export default class BsinessAnalysis extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      year:'2019'
    }
  }

  componentDidMount(){
    this.getChatMapData1()
    //this.getChatMapData2()
    this.getChatMapData3()
    this.getChatMapData4()
    this.getChatMapData5()
  }

  getChatMapData1 = () => {
    let params = {
      year:this.state.year
    }
    let data = {
      data1:[],
      data2:[],
      names:[]
    }
    let data2 = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "names": []
    }
    api.GetElecData(params).then(res => {
      if(res.status === 0){
        //图表1数据处理开始
        res.data.tradeCompareList[0].map(item => {
          if(item !== '--' && item !== '0' && item !== 0){
            data.data2.push(item)
          }else{
            data.data2.push(0)
          }
        })
        res.data.tradeCompareList[1].map(item => {
          if(item !== '--' && item !== '0' && item !== 0){
            data.data1.push(item)
          }else{
            data.data1.push(0)
          }
        })
        //图表1数据处理结束
        //图表2数据处理开始
        data2.data1 = res.data.tradeWayLists[1]
        data2.data2 = res.data.tradeWayLists[0]
        data2.data3 = res.data.tradeWayLists[2]
        data2.data4 = res.data.tradeWayLists[3]
        data2.data5 = res.data.tradeWayLists[4]
        //图表2数据处理结束
        for(let i=0;i<12;i++){
          data.names.push(i+1+'月')
          data2.names.push(i+1+'月')
        }
        console.log(data2)
        this.paintingMap1(data)
        this.paintingMap2(data2)
      }
    })
  }
  paintingMap1 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart1'));
    let option = {
      color:['#288dfd','#f9a30c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '8%',
        bottom: '10%',
        containLabel: true
      },
      calculable: true,
      legend: {
        data: ['交易电量', '实际用电量'],
        formatter:function (name) {
          return name;
        }
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      series: [
        {
          name: '交易电量',
          type: 'bar',
          data: data.data2,
          barWidth:8,
          barGap:0,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        },
        {
          name: '实际用电量',
          type: 'bar',
          data: data.data1,
          barWidth:8,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }

  getChatMapData2 = () => {
    this.paintingMap2()
  }
  paintingMap2 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart2'));
    let option = {
      color:['#288dfd','#f9a30c','#6dcfce','#ddc275'],
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      calculable: true,
      legend: {
        data: ['年度双边', '年度撮合', '月度双边','月度撮合', '月度挂牌'],
        formatter:function (name) {
          return name;
        }
      },
      grid: {
        top: '24%',
        left: '5%',
        right: '8%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      series: [
        {
          name: '年度双边',
          type: 'bar',
          data: data.data2,
          barWidth:4,
          barGap:0,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '年度撮合',
          type: 'bar',
          data: data.data1,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '月度双边',
          type: 'bar',
          data: data.data3,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '月度撮合',
          type: 'bar',
          data: data.data4,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '月度挂牌',
          type: 'bar',
          data: data.data5,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }

  getChatMapData3 = () => {
    let params = {
      year:this.state.year
    }
    api.GetSouDianCompanyAnalysis(params).then(res => {

    })
    this.paintingMap3()
  }
  paintingMap3 = () => {
    var myChart = echarts.init(document.getElementById('myChart3'));
    let data = {
      dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      data1: [50, 60, -80, 50, 40, -50, 80, 60, 50, 80, 40, 10],
      data2: [50, 60, -80, 50, 40, -50, 80, 60, 50, 80, 40, 10],
    }
    let option = {
      color: ['#288dfd', '#f9a30c'],
      legend: {
        data: ['偏差电量', '偏差率']
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        },
        formatter:function(params){
          var result = ''
          params.forEach(function (item) {
            result += item.seriesName + ':' + item.value + "</br>"
          })
          return result
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
        {
          type: 'category',
          boundaryGap: true,
          data: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          boundaryGap: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
        {
          type: 'value',
          scale: true,
          boundaryGap: data.dataX,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      series: [
        {
          name: '偏差电量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.data2,
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          }
        },
        {
          name: '偏差率',
          type: 'line',
          data: data.data1
        }
      ]
    };
    myChart.setOption(option)
  }

  getChatMapData4 = () => {
    let params = {
      year:this.state.year
    }
    api.GetBuyPowerCostAnalysis(params).then(res => {

    })
    this.paintingMap4()
  }
  paintingMap4 =() => {
    var myChart = echarts.init(document.getElementById('myChart4'));
    let data = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "data5": [],
      "delta": [],
      "names": []
    }
    for(let i=0;i<12;i++){
      data.data1.push( parseInt(Math.random() * 50))
      data.data2.push( parseInt(Math.random() * 50))
      data.data3.push( parseInt(Math.random() * 50))
      data.data4.push( parseInt(Math.random() * 80))
      data.data5.push( parseInt(Math.random() * 80))
      data.delta.push(i)
      data.names.push(i+1+'月')
    }
    let option = {
      color:['#288dfd','#f9a30c','#6dcfce','#3594fd','#f9a40f'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      calculable: true,
      legend: {
        data: ['售电成本', '购电成本','成本差', '成本差环比（%）','成本差同比（%）'],
        formatter:function (name) {
          return name;
        }
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '8%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      series: [
        {
          name: '售电成本',
          type: 'bar',
          data: data.data2,
          barWidth:4,
          barGap:0,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '购电成本',
          type: 'bar',
          data: data.data1,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '成本差',
          type: 'bar',
          data: data.data3,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '成本差环比（%）',
          type: 'line',
          data: data.data4
        },
        {
          name: '成本差同比（%）',
          type: 'line',
          data: data.data5
        }
      ]
    };

    myChart.setOption(option);
  }

  getChatMapData5 = () => {
    let params = {
      year:this.state.year
    }
    // api.GetRevenueAnalysis(params).then(res => {

    // })
    this.paintingMap5()
  }
  paintingMap5 =() => {
    var myChart = echarts.init(document.getElementById('myChart5'));
    let data = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "data5": [],
      "data6": [],
      "delta": [],
      "names": []
    }
    for(let i=0;i<12;i++){
      data.data1.push( parseInt(Math.random() * 50))
      data.data2.push( parseInt(Math.random() * 50))
      data.data3.push( parseInt(Math.random() * 50))
      data.data4.push( parseInt(Math.random() * 80))
      data.data5.push( parseInt(Math.random() * 80))
      data.data6.push( parseInt(Math.random() * 80))
      data.delta.push(i)
      data.names.push(i+1+'月')
    }
    let option = {
      color:['#288dfd','#f9a30c','#6dcfce','#ddc275','#288dfd','#f9a40f'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            color: '#000'
          }
        }
      },
      calculable: true,
      legend: {
        data: ['售电成本', '购电成本','转让代理费','总收益', '总收益环比（%）','总收益同比（%）'],
        formatter:function (name) {
          return name;
        }
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '10%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        },
        {
          type: 'category',
          boundaryGap: true,
          data: data.names,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        },
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#eeeeee',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666',//坐标值得具体的颜色
              formatter: function (a) {
                a = +a;
                return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
              }
            }
          }
        }
      ],
      series: [
        {
          name: '售电成本',
          type: 'bar',
          data: data.data2,
          barWidth:4,
          barGap:0,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '购电成本',
          type: 'bar',
          data: data.data1,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '转让代理费',
          type: 'bar',
          data: data.data3,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '总收益',
          type: 'bar',
          data: data.data4,
          barWidth:4,
          itemStyle: {
            normal: {
              barBorderRadius: 4
            },
            emphasis: {
              barBorderRadius: 4
            }
          }
        },
        {
          name: '总收益环比（%）',
          type: 'line',
          data: data.data5
        },
        {
          name: '总收益同比（%）',
          type: 'line',
          data: data.data6
        }
      ]
    };

    myChart.setOption(option);
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
          <div className="t" style={{marginBottom:'10px'}}><i className="iconfont icondianliang"></i>电量对比分析</div>
          <div className="f2-map-view">
            <div id="myChart1" style={{height:'240px'}}></div>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t" style={{marginBottom:'10px'}}><i className="iconfont iconjiaoyizhongxin"></i>交易电量分析</div>
          <div className="f2-map-view">
            <div id="myChart2" style={{height:'320px'}}></div>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t" style={{marginBottom:'10px'}}><i className="iconfont iconjingyingfenxix"></i>偏差电量分析</div>
          <div className="f2-map-view">
            <div id="myChart3" style={{height:'320px'}}></div>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t" style={{marginBottom:'10px'}}><i className="iconfont iconjiage"></i>购电成本分析</div>
          <div className="f2-map-view">
            <div id="myChart4" style={{height:'320px'}}></div>
          </div>
        </div>
        <div style={{height:'10px',background:'#f0f1f3'}}></div>
        <div className="f2-map">
          <div className="t" style={{marginBottom:'10px'}}><i className="iconfont iconshouyi"></i>收益分析</div>
          <div className="f2-map-view">
            <div id="myChart5" style={{height:'320px'}}></div>
          </div>
        </div>
      </div>
    )
  }
}
