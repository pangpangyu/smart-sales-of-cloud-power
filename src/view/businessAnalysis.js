import React from 'react'
import Header from '../components/header';
import echarts from 'echarts';
import api from '../api/index';
import { PickerView } from 'antd-mobile';
/**
 * 经营分析
 */

export default class BsinessAnalysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: '2019',
      value:['2019'],
      openPickerView:false,
      yearList: [
        {label:'2010',value:'2010'},
        {label:'2011',value:'2011'},
        {label:'2012',value:'2012'},
        {label:'2013',value:'2013'},
        {label:'2014',value:'2014'},
        {label:'2015',value:'2015'},
        {label:'2016',value:'2016'},
        {label:'2017',value:'2017'},
        {label:'2018',value:'2018'},
        {label:'2019',value:'2019'},
        {label:'2020',value:'2020'},
        {label:'2021',value:'2021'}
      ]
    }
  }

  componentDidMount() {
    this.getChatMapData1()
    //this.getChatMapData2()
    this.getChatMapData3()
    this.getChatMapData4()
    this.getChatMapData5()
  }

  getChatMapData1 = () => {
    let params = {
      year: this.state.year
    }
    let data = {
      data1: [],
      data2: [],
      names: []
    }
    let data2 = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "names": []
    }
    api.GetElecData(params).then(res => {
      if (res.status === 0) {
        //图表1数据处理开始
        res.data.tradeCompareList[0].map((item,index) => {
          if (item !== '--' && item !== '0' && item !== 0) {
            data.data2.push(item)
          } else {
            data.data2.push(0)
          }
          return 0
        })
        res.data.tradeCompareList[1].map(item => {
          if (item !== '--' && item !== '0' && item !== 0) {
            data.data1.push(item)
          } else {
            data.data1.push(0)
          }
          return 0
        })
        //图表1数据处理结束
        //图表2数据处理开始
        data2.data1 = res.data.tradeWayLists[1]
        data2.data2 = res.data.tradeWayLists[0]
        data2.data3 = res.data.tradeWayLists[2]
        data2.data4 = res.data.tradeWayLists[3]
        data2.data5 = res.data.tradeWayLists[4]
        //图表2数据处理结束
        for (let i = 0; i < 12; i++) {
          data.names.push(i + 1 + '月')
          data2.names.push(i + 1 + '月')
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
      color: ['#288dfd', '#f9a30c'],
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
        formatter: function (name) {
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
          barWidth: 8,
          barGap: 0,
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
          barWidth: 8,
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
      color: ['#288dfd', '#f9a30c', '#6dcfce', '#ddc275'],
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
        data: ['年度双边', '年度撮合', '月度双边', '月度撮合', '月度挂牌'],
        formatter: function (name) {
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
          barWidth: 4,
          barGap: 0,
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
          barWidth: 4,
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
          barWidth: 4,
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
          barWidth: 4,
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
          barWidth: 4,
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
      year: this.state.year
    }
    let data = {
      dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      data2: [],
      data1: [],
    }
    api.GetSouDianCompanyAnalysis(params).then(res => {
      res.pictureData2.deviationPower.map(item => {
        if (item) {
          data.data2.push(item)
        } else {
          data.data2.push(0)
        }
      })
      res.pictureData2.deviationRate.map(item => {
        if (item) {
          data.data1.push(item)
        } else {
          data.data1.push(0)
        }
      })
      this.paintingMap3(data)
    })
  }
  paintingMap3 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart3'));
    let option = {
      color: ['#f9a30c','#288dfd'],
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
        formatter: function (params) {
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
          max: 10000,
          min: -10000,
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
          max: 500,
          min: -500,
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
          name: '偏差率',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.data1,
        },
        {
          name: '偏差电量',
          type: 'bar',
          barWidth: 10,
          data: data.data2,
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
    myChart.setOption(option)
  }

  getChatMapData4 = () => {
    let params = {
      year: this.state.year
    }
    let data = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "data5": [],
      "names": []
    }
    api.GetBuyPowerCostAnalysis(params).then(res => {
      data.data1 = res.data.costList[0]
      data.data2 = res.data.costList[1]
      data.data3 = res.data.costList[2]
      data.data4 = res.data.costList[3]
      data.data5 = res.data.costList[4]
      for (let i = 0; i < 12; i++) {
        data.names.push(i + 1 + '月')
      }
      this.paintingMap4(data)
    })
  }
  paintingMap4 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart4'));
    let option = {
      color: ['#288dfd', '#f9a30c', '#6dcfce', '#3594fd', '#f9a40f'],
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
        data: ['售电成本', '购电成本', '成本差', '成本差环比（%）', '成本差同比（%）'],
        formatter: function (name) {
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
        },
        {
          type: 'value',
          scale: true,
          boundaryGap: data.dataX,
          max: 100,
          min: -100,
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
          name: '售电成本',
          type: 'bar',
          data: data.data2,
          barWidth: 4,
          barGap: 0,
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
          barWidth: 4,
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
          barWidth: 4,
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
      year: this.state.year
    }
    let data = {
      "data1": [],
      "data2": [],
      "data3": [],
      "data4": [],
      "data5": [],
      "data6": [],
      "names": []
    }
    api.GetRevenueAnalysis(params).then(res => {
      data.data1 = res.pictureData1.buyPowerCostlist
      data.data2 = res.pictureData1.salePowerCostlist
      data.data3 = res.pictureData1.agencyFeelist
      data.data4 = res.pictureData1.monthlyProfitlist
      // data.data5 = res.pictureData1.monthOnMonth
      res.pictureData1.monthOnMonth.map(item => {
        if (item) {
          data.data5.push(item)
        } else {
          data.data5.push(0)
        }
      })
      res.pictureData1.yearOnYear.map(item => {
        if (item) {
          data.data6.push(item)
        } else {
          data.data6.push(0)
        }
      })
      for (let i = 0; i < 12; i++) {
        data.names.push(i + 1 + '月')
      }
      this.paintingMap5(data)
    })
  }
  paintingMap5 = (data) => {
    var myChart = echarts.init(document.getElementById('myChart5'));
    let option = {
      color: ['#288dfd', '#f9a30c', '#6dcfce', '#ddc275', '#288dfd', '#f9a40f'],
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
        data: ['售电成本', '购电成本', '转让代理费', '总收益', '总收益环比（%）', '总收益同比（%）'],
        formatter: function (name) {
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
          barWidth: 4,
          barGap: 0,
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
          barWidth: 4,
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
          barWidth: 4,
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
          barWidth: 4,
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

  onChange = (e) => {
    this.setState({
      value:e
    })
  }

  sure = () => {
    if(this.state.value.length > 0){
      console.log(this.state.value[0])
      this.setState({
        year:this.state.value[0],
        openPickerView:false
      },()=>{
        this.getChatMapData1()
        this.getChatMapData3()
        this.getChatMapData4()
        this.getChatMapData5()
      })
    }
  }

  render() {
    return (
      <div style={{ minHeight: '100vh', background: '#fff' }} className="bsiness-analysis">
        <Header title={'经营分析'} back={true} />
        <div className="time-chooes">
          <div className="l">选择时间</div>
          <div className="r" onClick={() => this.setState({openPickerView:true})}>{this.state.year}<i className="iconfont iconxiala1"></i></div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="f2-map">
          <div className="t" style={{ marginBottom: '10px' }}><i className="iconfont icondianliang"></i>电量对比分析</div>
          <div className="f2-map-view">
            <div id="myChart1" style={{ height: '240px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="f2-map">
          <div className="t" style={{ marginBottom: '10px' }}><i className="iconfont iconjiaoyizhongxin"></i>交易电量分析</div>
          <div className="f2-map-view">
            <div id="myChart2" style={{ height: '320px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="f2-map">
          <div className="t" style={{ marginBottom: '10px' }}><i className="iconfont iconjingyingfenxix"></i>偏差电量分析</div>
          <div className="f2-map-view">
            <div id="myChart3" style={{ height: '320px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="f2-map">
          <div className="t" style={{ marginBottom: '10px' }}><i className="iconfont iconjiage"></i>购电成本分析</div>
          <div className="f2-map-view">
            <div id="myChart4" style={{ height: '320px' }}></div>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="f2-map">
          <div className="t" style={{ marginBottom: '10px' }}><i className="iconfont iconshouyi"></i>收益分析</div>
          <div className="f2-map-view">
            <div id="myChart5" style={{ height: '320px' }}></div>
          </div>
        </div>
        <div className={this.state.openPickerView ? 'year-model on' : 'year-model'}>
          <div className="year-model-view">
            <PickerView
              data={this.state.yearList}
              cascade={false}
              value={this.state.value}
              onChange={this.onChange}
            />
            <div className="btn">
              <button onClick={() => this.setState({openPickerView:false})}>取消</button>
              <button onClick={this.sure}>确定</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
