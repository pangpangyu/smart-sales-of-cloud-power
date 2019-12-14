import React from 'react';
import Header from '../components/header';
import api from '../api/index';
import echarts from 'echarts';
/**
 * 售电概况
 */

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: [
        { id: 1, num: '200', title: '合同总数', bg: '#3778f5', unit: '个' },
        { id: 2, num: '25100', title: '合同电量', bg: '#288dfd', unit: '兆瓦时' },
        { id: 3, num: '200', title: '合同收益', bg: '#3aaafb', unit: '万元' },
        { id: 4, num: '2000', title: '合同总数', bg: '#4fcdfd', unit: '个' }
      ],
    }
  }

  componentDidMount() {
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
    let params = { "electricQuantity": 48178, "cusCount": 12, "earnings": 0.01, "year": 2019, "contractNum": 5 }
    api.GetTabControlData(params).then(res => {

    })
  }
  getDataChart1 = () => {
    this.paintingChart1()
  }
  paintingChart1 = () => {
    var myChart = echarts.init(document.getElementById('myChart1'));
    let data = [
      { value: '5', name: '1月', percentage: '6%' },
      { value: '5', name: '2月', percentage: '6%' },
      { value: '5', name: '3月', percentage: '6%' },
      { value: '5', name: '4月', percentage: '6%' },
      { value: '5', name: '5月', percentage: '6%' },
      { value: '5', name: '6月', percentage: '6%' },
      { value: '5', name: '7月', percentage: '6%' },
      { value: '5', name: '8月', percentage: '6%' },
      { value: '5', name: '9月', percentage: '6%' },
      { value: '5', name: '10月', percentage: '6%' },
      { value: '5', name: '11月', percentage: '6%' },
      { value: '5', name: '12月', percentage: '6%' },
    ]
    let option = {
      color: ['#616fd8', '#dc6142', '#6dcfce', '#ddc275', '#e1a26d', '#b3b273', '#7aa0ca', '#c380a6', '#44c489', '#288dfd', '#f9a30c', '#ac663d'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        itemHeight: 10,
        itemWidth: 10,
        itemGap: 10,
        formatter: function (name) {
          let arr = data.filter(item => item.name === name)[0]
          return name + ' ' + arr.value + '份 ' + arr.percentage + ' ';
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['80%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '15',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }
      ]
    };
    myChart.setOption(option)
  }

  getDataChart2 = () => {
    this.paintingChart2()
  }
  paintingChart2 = () => {
    var myChart = echarts.init(document.getElementById('myChart2'));
    let option = {
      color: ['#288dfd'],
      dataset: {
        source: [
          [90, 2017],
          [103, 2018],
          [124, 2019]
        ]
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
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
            }
          }
        },
      ],
      yAxis: {
        type: 'category',
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
      series: [
        {
          type: 'bar',
          encode: {
            x: '',
            y: ''
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 10
            },
            emphasis: {
              barBorderRadius: 10
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#000'
              }
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }

  getDataChart3 = () => {
    this.paintingChart3()
  }
  paintingChart3 = () => {
    var myChart = echarts.init(document.getElementById('myChart3'));
    // myChart.on('click', function (params) {
    //   let index = parseInt(params.name)
    //   option.legend.formatter = function (name) {
    //     return name === '合同电量' ? '合同电量 ' + (data.data1[index - 1]) : '合同收益 ' + (data.data2[index - 1]);
    //   }
    //   myChart.setOption(option)
    // });
    let data = {
      dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      data1: [5, 6, 8, 5, 4, 5, 8, 6, 5, 8, 4, 1],
      data2: [9, 5, 4, 8, 6, 3, 2, 1, 5, 4, 5, 9]
    }
    let option = {
      color: ['#288dfd', '#f9a30c'],
      legend: {
        data: ['合同电量', '合同收益']
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      // tooltip: {},
      tooltip: {
        trigger: 'axis',
        formatter:function(params){
          var result = ''
          params.forEach(function (item) {
            result += item.seriesName + "</br>" + item.marker + item.value
          })
          console.log(result)
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
          min: 0,
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
          min: 0,
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
          name: '合同电量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.data1,
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
          name: '合同收益',
          type: 'line',
          data: data.data2
        }
      ]
    };
    myChart.setOption(option)
  }

  getDataChart4 = () => {
    this.paintingChart4()
  }
  paintingChart4 = () => {
    var myChart = echarts.init(document.getElementById('myChart4'));
    let data = {
      "data1": [],
      "data2": [],
      "delta": [],
      "names": []
    }
    for(let i=0;i<31;i++){
      data.data1.push( parseInt(Math.random() * 100))
      data.data2.push( parseInt(Math.random() * 200))
      data.delta.push(i)
      data.names.push(i+1+'日')
    }
    let option = {
      color:['#288dfd','#f9a30c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['申报电量', '实时电量'],
        // itemGap: 5
        formatter:function (name) {
          //return name === '申报电量' ? '申报电量 ' + (data.data1[index - 1]) : '实时电量 ' + (data.data2[index - 1]);
          return name;
        }
      },
      grid: {
        top: '15%',
        left: '1%',
        right: '3%',
        bottom: '3%',
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
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 31,
          type: 'inside',
        }
      ],
      series: [
        {
          name: '申报电量',
          type: 'bar',
          data: data.data2,
          barWidth:9,
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
          name: '实时电量',
          type: 'bar',
          data: data.data1,
          barWidth:9,
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

  getDataChart5 = () => {
    this.paintingChart5()
  }
  paintingChart5 = () => {
    var myChart = echarts.init(document.getElementById('myChart5'));
    let data = {
      "data1": [],
      "data2": [],
      "delta": [],
      "names": []
    }
    for(let i=0;i<31;i++){
      data.data1.push( parseInt(Math.random() * 100))
      data.data2.push( parseInt(Math.random() * 200))
      data.delta.push(i)
      data.names.push(i+1+'日')
    }
    let option = {
      color:['#288dfd','#f9a30c'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['日前均价', '实时均价'],
        // itemGap: 5
        formatter:function (name) {
          //return name === '申报电量' ? '申报电量 ' + (data.data1[index - 1]) : '实时电量 ' + (data.data2[index - 1]);
          return name;
        }
      },
      grid: {
        top: '15%',
        left: '1%',
        right: '3%',
        bottom: '3%',
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
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 31,
          type: 'inside',
        }
      ],
      series: [
        {
          name: '日前均价',
          type: 'line',
          data: data.data2,
          barWidth:9,
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
          name: '实时均价',
          type: 'line',
          data: data.data1,
        }
      ]
    };

    myChart.setOption(option);
  }

  render() {
    return (
      <div className="survey-page" style={{ minHeight: '100vh', background: '#f0f1f3' }}>
        <Header title={'售电概况'} back={true} search={false} />
        <div className="top-totls">
          {this.state.total && this.state.total.map(item => {
            return <div className="item" key={item.id} style={{ background: item.bg }}>
              <p><span style={{ fontSize: '19px' }}>{item.num}</span>{item.unit}</p>
              <p style={{ paddingTop: '10px' }}>{item.title}</p>
            </div>
          })}
        </div>
        <div style={{ height: '10px', color: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee' }}>
            <i className="iconfont iconhetong"></i>合同数量（2019年）
          </div>
          <div className="chear-view">
            <div style={{ fontSize: '12px', color: '#2b2a30', margin: '20px 0 10px 0' }}>各月份合同数据</div>
            <canvas id="myChart1" width="345" height="140"></canvas>
            <div style={{ fontSize: '12px', color: '#2b2a30', marginTop: '10px' }}>近三年合同数量</div>
            <canvas id="myChart2" width="345" height="120"></canvas>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee', marginBottom: '10px' }}>
            <i className="iconfont iconjiage"></i>中长期合同收益（2019年）
          </div>
          <div className="chear-view">
            <canvas id="myChart3" width="355" height="230"></canvas>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee' }}>
            <i className="iconfont icondianliang"></i>现货电量（2019年11月）
          </div>
          <div className="chear-view" style={{ paddingBottom: '10px' }}>
            <canvas id="myChart4" width="345" height="230"></canvas>
          </div>
        </div>
        <div style={{ height: '10px', background: '#f0f1f3' }}></div>
        <div className="charts-map">
          <div className="title" style={{ borderBottom: '1px solid #eeeeee' }}>
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






